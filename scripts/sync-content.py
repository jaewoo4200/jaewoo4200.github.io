"""Rebuild the portfolio after editing content.json or projects.json."""
import runpy
from pathlib import Path
runpy.run_path(str(Path(__file__).with_name('build.py')), run_name='__main__')
