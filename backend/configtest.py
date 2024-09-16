import app
import sys
from pathlib import Path

# Adiciona o diretório 'src' ao sys.path
src_path = Path(__file__).parent / "src"
sys.path.insert(0, str(src_path))

# Cria um alias para 'domain' apontando para 'app.domain'
sys.modules['domain'] = app.domain

# Cria um alias para 'domain.database' apontando para 'app.domain.database'
sys.modules['domain.database'] = app.domain.database
