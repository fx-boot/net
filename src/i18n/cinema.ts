import type { Language } from './dictionaries';
interface CinemaCopy {
 view: string; carousel: string; archive: string; previous: string; next: string;
 loadMore: string; region: string; instructions: string; empty: string; shown: string;
}
export const cinemaCopy: Record<Language, CinemaCopy> = {
 zh: {view:'展映视图',carousel:'巨幕轮播',archive:'均等网格',previous:'上一部',next:'下一部',loadMore:'加载更多作品',region:'作品巨幕轮播',instructions:'左右方向键切换影片，手机可横向滑动。',empty:'此分类暂未收录影片。',shown:'已展映'},
 en: {view:'Screening view',carousel:'Carousel',archive:'Archive',previous:'Previous film',next:'Next film',loadMore:'Load more works',region:'Spotlight cinema',instructions:'Use left and right arrow keys, or swipe horizontally to browse.',empty:'No films in this category yet.',shown:'Showing'},
 ko: {view:'상영 보기',carousel:'대형 화면',archive:'균등 그리드',previous:'이전 작품',next:'다음 작품',loadMore:'작품 더 보기',region:'대형 화면 작품 상영',instructions:'좌우 방향키 또는 가로 스와이프로 작품을 전환하세요.',empty:'아직 이 분류의 작품이 없습니다.',shown:'상영 중'},
 ja: {view:'上映表示',carousel:'スクリーン',archive:'均等グリッド',previous:'前の作品',next:'次の作品',loadMore:'作品をもっと見る',region:'作品スクリーン',instructions:'左右の矢印キー、または横スワイプで作品を切り替えます。',empty:'このカテゴリーの作品はまだありません。',shown:'表示中'},
};
