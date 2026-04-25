#!/usr/bin/env python3
"""
Push BasketIQ — Track R: Domain Model Lab (placeholder mínimo) a Linear.

Crea (idempotente, no duplica si ya existen):
- 1 label: "Track R · I+D modelos"
- 1 Linear project: "Track R — Domain Model Lab (I+D 2027+)"
- 1 README issue dentro del proyecto, con resumen + link al documento fuente.

Sin épicas todavía. Las EP-R1..EP-R8 propuestas en el documento se crearán
cuando llegue el momento (Q4 2026 / Q1 2027) tras revisión real.

Uso:
    python scripts/linear_push_track_r.py             # dry-run
    python scripts/linear_push_track_r.py --apply     # crea todo
    python scripts/linear_push_track_r.py --apply --label    # solo label
    python scripts/linear_push_track_r.py --apply --project  # solo proyecto + README
    python scripts/linear_push_track_r.py --team-key BIQ     # override team key
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from typing import Dict, List, Optional, Tuple


if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")  # type: ignore[attr-defined]
if sys.stderr.encoding != "utf-8":
    sys.stderr.reconfigure(encoding="utf-8")  # type: ignore[attr-defined]

ENDPOINT = "https://api.linear.app/graphql"
DEFAULT_TEAM_KEY = "BIQ"

PROJECT_NAME = "Track R — Domain Model Lab (I+D 2027+)"
# Linear project description está limitada a 255 caracteres.
PROJECT_DESCRIPTION = (
    "Línea de I+D para modelos especializados de baloncesto formativo "
    "(open-weight + adapters + datasets propios). Horizonte 2027+. "
    "No compromete recursos durante el MVP abr-sep 2026. "
    "Review programada Q4 2026."
)

LABEL_NAME = "Track R · I+D modelos"
LABEL_COLOR = "#A78BFA"
LABEL_DESCRIPTION = (
    "Track R — Domain Model Lab. Línea de I+D para modelos especializados "
    "(open-weight, adapters, datasets propios). Horizonte 2027+."
)

README_TITLE = "README — Track R · Domain Model Lab"
SOURCE_DOC_REL = "club/basketiq-landing-page/basketiq_domain_model_lab_roadmap.md"
SOURCE_DOC_REPO_URL = (
    "https://github.com/jjdelcampo/basketiq-landing-page/blob/main/"
    "basketiq_domain_model_lab_roadmap.md"
)


# ─── Linear API client ───────────────────────────────────────────────────────

def _extract_constant(paths: List[str], name: str) -> Optional[str]:
    import re as _re
    pattern = _re.compile(rf'{name}\s*=\s*"([^"]+)"')
    for path in paths:
        if not os.path.exists(path):
            continue
        try:
            with open(path, "r", encoding="utf-8") as handle:
                match = pattern.search(handle.read())
        except OSError:
            continue
        if match:
            return match.group(1)
    return None


def infer_api_key() -> str:
    for env_name in ("LINEAR_API_KEY", "LINEAR_TOKEN"):
        value = os.getenv(env_name)
        if value:
            return value
    script_dir = os.path.dirname(os.path.abspath(__file__))
    sng_scripts = os.path.normpath(os.path.join(
        script_dir, "..", "..", "..", "basket-paas", "bau",
        "spain-nextgen", "scripts",
    ))
    candidate = _extract_constant(
        [
            os.path.join(sng_scripts, "linear_push_growth_plan.py"),
            os.path.join(sng_scripts, "linear_push_individual_issues.py"),
        ],
        "fallback",
    )
    if candidate:
        return candidate
    try:
        gp = os.path.join(sng_scripts, "linear_push_growth_plan.py")
        if os.path.exists(gp):
            with open(gp, "r", encoding="utf-8") as f:
                for line in f:
                    if "lin_api_" in line and "fallback" in line:
                        token = line.split('"')[1]
                        if token.startswith("lin_api_"):
                            return token
    except Exception:
        pass
    raise RuntimeError(
        "No se encontró LINEAR_API_KEY ni LINEAR_TOKEN en el entorno.\n"
        "Exporta la variable antes de ejecutar:\n"
        "  $env:LINEAR_API_KEY = 'lin_api_...'"
    )


class LinearClient:
    def __init__(self, api_key: str) -> None:
        self.api_key = api_key

    def gql(self, query: str, variables: Optional[Dict] = None) -> Dict:
        req = urllib.request.Request(ENDPOINT)
        req.add_header("Authorization", self.api_key)
        req.add_header("Content-Type", "application/json")
        payload: Dict = {"query": query}
        if variables:
            payload["variables"] = variables
        data = json.dumps(payload).encode("utf-8")
        try:
            with urllib.request.urlopen(req, data=data, timeout=30) as response:
                result = json.loads(response.read().decode("utf-8"))
        except urllib.error.HTTPError as exc:
            body = exc.read().decode("utf-8", errors="replace")
            raise RuntimeError(f"Linear API error: {body}") from exc
        if "errors" in result:
            raise RuntimeError(f"Linear GraphQL errors: {result['errors']}")
        return result

    def get_team_id(self, team_key: str) -> str:
        env_id = os.getenv("LINEAR_TEAM_ID")
        if env_id:
            return env_id
        query = "{ teams { nodes { id key name } } }"
        nodes = self.gql(query)["data"]["teams"]["nodes"]
        for node in nodes:
            if node.get("key") == team_key:
                print(f"  Equipo encontrado: {node['name']} (key={team_key}, id={node['id']})")
                return node["id"]
        names = ", ".join(f"{n['key']}={n['name']}" for n in nodes)
        raise RuntimeError(f"Team '{team_key}' no existe. Disponibles: {names}")

    def list_projects(self) -> List[Dict[str, str]]:
        query = "{ projects(first: 250) { nodes { id name } } }"
        return self.gql(query)["data"]["projects"]["nodes"]

    def create_project(self, name: str, description: str, team_ids: List[str]) -> str:
        mutation = """
        mutation ProjectCreate($input: ProjectCreateInput!) {
          projectCreate(input: $input) {
            success
            project { id name }
          }
        }
        """
        result = self.gql(mutation, {"input": {
            "name": name, "description": description, "teamIds": team_ids,
        }})
        payload = result["data"]["projectCreate"]
        if not payload["success"]:
            raise RuntimeError(f"Error creando proyecto {name}: {payload}")
        print(f"    Proyecto creado: {name} ({payload['project']['id']})")
        return payload["project"]["id"]

    def list_project_issues(self, project_id: str) -> List[Dict]:
        query = """
        query ProjectIssues($id: String!) {
          project(id: $id) { issues(first: 250) { nodes { id title } } }
        }
        """
        return self.gql(query, {"id": project_id})["data"]["project"]["issues"]["nodes"]

    def create_issue(
        self, team_id: str, project_id: str, title: str, description: str,
        label_ids: Optional[List[str]] = None,
    ) -> Tuple[str, str]:
        mutation = """
        mutation IssueCreate($input: IssueCreateInput!) {
          issueCreate(input: $input) {
            success
            issue { id title identifier }
          }
        }
        """
        inp: Dict = {
            "teamId": team_id,
            "projectId": project_id,
            "title": title,
            "description": description,
        }
        if label_ids:
            inp["labelIds"] = label_ids
        result = self.gql(mutation, {"input": inp})
        payload = result["data"]["issueCreate"]
        if not payload["success"]:
            raise RuntimeError(f"Error creando issue {title}: {payload}")
        ident = payload["issue"].get("identifier", "")
        return payload["issue"]["id"], ident

    def list_labels(self) -> List[Dict]:
        query = "{ issueLabels(first: 250) { nodes { id name } } }"
        return self.gql(query)["data"]["issueLabels"]["nodes"]

    def create_label(self, team_id: str, name: str, color: str, description: str = "") -> str:
        mutation = """
        mutation IssueLabelCreate($input: IssueLabelCreateInput!) {
          issueLabelCreate(input: $input) {
            success
            issueLabel { id name }
          }
        }
        """
        inp: Dict = {"name": name, "color": color, "teamId": team_id}
        if description:
            inp["description"] = description
        result = self.gql(mutation, {"input": inp})
        payload = result["data"]["issueLabelCreate"]
        if not payload["success"]:
            raise RuntimeError(f"Error creando label {name}: {payload}")
        print(f"    Label creado: {name} ({payload['issueLabel']['id']})")
        return payload["issueLabel"]["id"]


# ─── Content builders ─────────────────────────────────────────────────────────

def build_readme_description() -> str:
    return f"""# Track R — Domain Model Lab (I+D 2027+)

**Estado:** placeholder estratégico. Sin épicas activas todavía.
**Horizonte:** Q1 2027 en adelante.
**No compromete recursos** durante el MVP BasketIQ abril–septiembre 2026.

## Qué es Track R

Línea de I+D para construir **capacidades propias de modelos especializados en texto** para baloncesto formativo, partiendo de modelos open-weight y adapters LoRA/QLoRA, no entrenando un modelo fundacional desde cero.

## Cinco motivaciones (no solo coste)

1. **Reducir coste operativo** en tareas repetitivas y batch — relevante a partir de ~1.000 clubes.
2. **Aumentar privacidad y control** sobre datos sensibles del club, especialmente menores.
3. **Construir IP defendible**: datasets, adapters, benchmarks, modelos especializados.
4. **Reforzar narrativa europea** de innovación tecnológica propia (NEOTEC, EIC, soberanía).
5. **Reducir dependencia** de APIs comerciales y mantener control de la conversación.

## Estrategia consensuada (dos fases)

- **v1 con modelo open-weight maduro** (Llama / Qwen / Gemma según madurez en su momento). Construye el pipeline completo (dataset, eval harness, training scripts, model registry, batch jobs). El modelo base es commodity reemplazable.
- **v2 con modelo de origen europeo** (Mistral / Salamandra del BSC / EuroLLM o sucesor). Hereda todo el aparato de v1. Coste marginal pequeño, beneficio narrativo y de soberanía grande.

## Escala y break-even (referencia)

| Escala | Tareas/año (todos los roles) | Coste API anual estimado | Coste laboratorio anual estimado |
|---|---|---|---|
| 1 club (MVP sept 2026) | ~5K | $5–25 | N/A |
| 100 clubes | ~500K | $500–2.500 | $8K–12K |
| 1.000 clubes | ~5M | $5K–25K | $10K–20K — empieza a empatar |
| 10.000 clubes | ~50M | $50K–300K | $30K–80K — local gana |

## Decisión actual

**No abrir épicas ni asignar recursos hasta Q4 2026 / Q1 2027**, cuando el MVP haya generado dataset operativo real y se pueda decidir con datos.

Cuando llegue el momento, las épicas iniciales serán como mucho **3 activas**:
- EP-R1 · Dataset foundation (esquema JSONL + governance + benchmark inicial)
- EP-R7 · Model governance light (políticas, anonimización, datos de menores)
- EP-R2 · Benchmark hosted (comparar 2-3 modelos open-weight, hosted fine-tuning)

Las otras EP-R3..EP-R6 y EP-R8 quedarán como placeholders 2027+.

## Documento fuente

Razonamiento completo y revisión crítica:
- Repo: `{SOURCE_DOC_REL}`
- GitHub: {SOURCE_DOC_REPO_URL}

## Próxima revisión

**Q4 2026** — cuando el MVP haya validado o invalidado supuestos sobre uso real,
volumen de dataset y curva de adopción.
"""


# ─── Steps ────────────────────────────────────────────────────────────────────

def step_label(client: LinearClient, team_id: str, apply: bool) -> Optional[str]:
    print("\n=== Label ===")
    existing = {lb["name"]: lb["id"] for lb in client.list_labels()}
    if LABEL_NAME in existing:
        lid = existing[LABEL_NAME]
        print(f"  Ya existe: {LABEL_NAME} ({lid})")
        return lid
    if not apply:
        print(f"  [dry-run] Crearía label: {LABEL_NAME}")
        return None
    return client.create_label(team_id, LABEL_NAME, LABEL_COLOR, LABEL_DESCRIPTION)


def step_project(
    client: LinearClient, team_id: str, apply: bool, label_id: Optional[str],
) -> Optional[str]:
    print("\n=== Proyecto ===")
    existing = {p["name"]: p["id"] for p in client.list_projects()}
    if PROJECT_NAME in existing:
        pid = existing[PROJECT_NAME]
        print(f"  Ya existe: {PROJECT_NAME} ({pid})")
        # Asegura README dentro
        readme_existing = {i["title"]: i["id"] for i in client.list_project_issues(pid)}
        if README_TITLE in readme_existing:
            print(f"      Ya existe README issue: {README_TITLE}")
        elif apply:
            label_ids = [label_id] if label_id else None
            _iid, ident = client.create_issue(
                team_id, pid, README_TITLE, build_readme_description(),
                label_ids=label_ids,
            )
            print(f"      + README creado: {ident} — {README_TITLE}")
        else:
            print(f"      [dry-run] Crearía README issue: {README_TITLE}")
        return pid

    if not apply:
        print(f"  [dry-run] Crearía proyecto: {PROJECT_NAME}")
        print(f"  [dry-run] Crearía README issue: {README_TITLE}")
        return "DRY_RUN"

    pid = client.create_project(PROJECT_NAME, PROJECT_DESCRIPTION, [team_id])
    label_ids = [label_id] if label_id else None
    _iid, ident = client.create_issue(
        team_id, pid, README_TITLE, build_readme_description(),
        label_ids=label_ids,
    )
    print(f"      + README creado: {ident} — {README_TITLE}")
    return pid


# ─── Main ─────────────────────────────────────────────────────────────────────

def main(argv: List[str]) -> int:
    parser = argparse.ArgumentParser(
        description="Crea placeholder mínimo de Track R en Linear (BasketIQ)."
    )
    parser.add_argument("--apply", action="store_true", help="Ejecuta cambios reales (por defecto: dry-run).")
    parser.add_argument("--team-key", default=DEFAULT_TEAM_KEY, help=f"Team key en Linear (default: {DEFAULT_TEAM_KEY}).")
    parser.add_argument("--label", action="store_true", help="Solo crear el label.")
    parser.add_argument("--project", action="store_true", help="Solo crear proyecto + README.")
    args = parser.parse_args(argv)

    run_all = not (args.label or args.project)

    if not args.apply:
        print("Modo dry-run. Usa --apply para ejecutar.\n")

    client = LinearClient(infer_api_key())
    team_id = client.get_team_id(args.team_key)
    print(f"Equipo Linear: {args.team_key} ({team_id})")

    label_id: Optional[str] = None
    if run_all or args.label:
        label_id = step_label(client, team_id, args.apply)
    else:
        existing = {lb["name"]: lb["id"] for lb in client.list_labels()}
        label_id = existing.get(LABEL_NAME)

    if run_all or args.project:
        step_project(client, team_id, args.apply, label_id)

    print("\nDone.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
