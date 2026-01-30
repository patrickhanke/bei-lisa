export interface ScrollPositions {
    start?: number;
    angebot?: number;
    salon?: number;
    team?: number;
    kontakt?: number;
  }
  
  export interface HeaderProps {
    siteState?: string;
    position?: ScrollPositions;
    top?: string;
    popupHandler?: (state: boolean) => void;
  }