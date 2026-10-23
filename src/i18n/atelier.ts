import type { Language } from './dictionaries';
interface CreativeDiscipline { code: string; title: string; label: string; description: string; }
interface AtelierCopy { dossierTitle: string; directorDiscipline: string; plateLabel: string; practiceTitle: string; disciplines: CreativeDiscipline[]; }
export const atelierCopy: Record<Language, AtelierCopy> = {
  "zh": {
    "dossierTitle": "创作者档案",
    "directorDiscipline": "跨媒介 / AI影像导演",
    "plateLabel": "创作者档案",
    "practiceTitle": "创作领域",
    "disciplines": [
      {
        "code": "01",
        "title": "AI & COMPUTATIONAL CINEMA",
        "label": "生成式AI / 数字生成艺术",
        "description": "生成式影像工作流、计算美学与AI叙事探索。"
      },
      {
        "code": "02",
        "title": "2D / 3D ANIME & CGI",
        "label": "二维 / 三维混合动画",
        "description": "从漫改IP开发、作画监督到三维场景与CGI。"
      },
      {
        "code": "03",
        "title": "LIVE-ACTION & DRAMA SERIES",
        "label": "真人电影 / 剧集",
        "description": "院线长片、真人剧集、中剧与高概念短剧。"
      },
      {
        "code": "04",
        "title": "COMMERCIALS & MUSIC PV",
        "label": "商业视效 / 音乐PV",
        "description": "品牌影像、游戏概念PV、音乐影像与艺术展映。"
      }
    ]
  },
  "en": {
    "dossierTitle": "Artist dossier",
    "directorDiscipline": "Director & Hybrid Artist",
    "plateLabel": "Artist dossier",
    "practiceTitle": "Creative practice",
    "disciplines": [
      {
        "code": "01",
        "title": "AI & COMPUTATIONAL CINEMA",
        "label": "Generative cinema",
        "description": "Generative image workflows, computational art and AI storytelling."
      },
      {
        "code": "02",
        "title": "2D / 3D ANIME & CGI",
        "label": "Hybrid animation",
        "description": "2D/3D animation, manga IP development, animation direction and CGI."
      },
      {
        "code": "03",
        "title": "LIVE-ACTION & DRAMA SERIES",
        "label": "Cinema & drama",
        "description": "Theatrical features, live-action series, mid-length and high-concept short dramas."
      },
      {
        "code": "04",
        "title": "COMMERCIALS & MUSIC PV",
        "label": "Commercial & music films",
        "description": "Brand films, game concept PV, music videos and moving-image exhibitions."
      }
    ]
  },
  "ko": {
    "dossierTitle": "아티스트 아카이브",
    "directorDiscipline": "감독 / 하이브리드 아티스트",
    "plateLabel": "아티스트 아카이브",
    "practiceTitle": "창작 분야",
    "disciplines": [
      {
        "code": "01",
        "title": "AI & COMPUTATIONAL CINEMA",
        "label": "생성형 AI · 디지털 아트",
        "description": "생성형 영상 워크플로와 컴퓨테이셔널 아트, AI 스토리텔링."
      },
      {
        "code": "02",
        "title": "2D / 3D ANIME & CGI",
        "label": "2D·3D 하이브리드 애니메이션",
        "description": "만화 원작 IP 개발부터 작화 감독, 3D 공간과 CGI까지."
      },
      {
        "code": "03",
        "title": "LIVE-ACTION & DRAMA SERIES",
        "label": "실사영화 · 드라마",
        "description": "극장용 장편, 실사 시리즈, 미드폼과 하이 콘셉트 숏드라마."
      },
      {
        "code": "04",
        "title": "COMMERCIALS & MUSIC PV",
        "label": "상업 영상 · 음악 PV",
        "description": "브랜드 영상, 게임 콘셉트 PV, 뮤직비디오와 예술 상영."
      }
    ]
  },
  "ja": {
    "dossierTitle": "作家の記録",
    "directorDiscipline": "監督 / クロスメディア・アーティスト",
    "plateLabel": "作家の記録",
    "practiceTitle": "創作の領域",
    "disciplines": [
      {
        "code": "01",
        "title": "AI & COMPUTATIONAL CINEMA",
        "label": "生成AI・デジタル生成芸術",
        "description": "生成映像のワークフローと、アルゴリズムによる物語表現。"
      },
      {
        "code": "02",
        "title": "2D / 3D ANIME & CGI",
        "label": "2D・3Dハイブリッドアニメ",
        "description": "漫画原作のIP開発、作画監督、三次元空間とCGI。"
      },
      {
        "code": "03",
        "title": "LIVE-ACTION & DRAMA SERIES",
        "label": "実写映画・ドラマ",
        "description": "劇場用長編、連続ドラマ、中編・高コンセプトのショートドラマ。"
      },
      {
        "code": "04",
        "title": "COMMERCIALS & MUSIC PV",
        "label": "商業映像・音楽PV",
        "description": "ブランド映像、ゲームコンセプトPV、音楽映像、アート上映。"
      }
    ]
  }
};
