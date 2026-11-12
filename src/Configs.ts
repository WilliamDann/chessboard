import { defaults } from '@lichess-org/chessground/state'
import type { Config } from '@lichess-org/chessground/config'

export const DefaultConfig = defaults()
export const AnalysisConfig = {
  ranksPosition: 'left',
  movable: {
    free: false
  }
} as Config;
