import React, { useEffect } from 'react';
import { searchProps } from './Search';
import "../styles/map.scss";

declare global {
  interface Window {
    kakao: any;
  }
}

interface placeType {
  place_name: string,
  road_address_name: string,
  address_name: string,
  phone: string,
  place_url: string
}

const Map = (props: searchProps) => {
  let markers: any[] = [];

  useEffect(() => {
    let container = document.getElementById('map');
    let options = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3
    };
    let map = new window.kakao.maps.Map(container, options);

    let ps = new window.kakao.maps.services.Places();

    const infowindow = new window.kakao.maps.InfoWindow({zIndex:1});
    
    searchPlaces();

    //키워드 검색을 요청하는 함수
    function searchPlaces() {
      let keyword = props.search;
      
      if (!keyword.replace(/^\s+|\s+$/g, "")) {
        return false;
      }
      ps.keywordSearch(keyword, placesSearchCB);
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수
    function placesSearchCB(data: any, status: any, pagination: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        displayPlaces(data);
        displayPagination(pagination);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색결과가 존재하지 않습니다");
        return;
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert("오류 발생");
        return;
      }
    }


    // 검색 결과 목록과 마커를 표출하는 함수
    function displayPlaces(places: string | any[]) {
      const listEl = document.getElementById("places-list");
      const resultEl = document.getElementById("search-list");
      const fragment = document.createDocumentFragment();
      const bounds = new window.kakao.maps.LatLngBounds();

      listEl && removeAllChildNods(listEl);

      removeMarker();

      for (let i = 0; i < places.length; i++) {
        let placePosition = new window.kakao.maps.LatLng(places[i].y, places[i].x);
        let marker = addMarker(placePosition, i, undefined);
        let itemEl = getListItem(i, places[i]);

        bounds.extend(placePosition);

        (function(marker, title) {
          window.kakao.maps.event.addListener(marker, "mouseover", function() {
            displayInfowindow(marker, title);
          });

          window.kakao.maps.event.addListener(marker, "mouseout", function() {
            infowindow.close();
          });

          itemEl.onmouseover = function () {
            displayInfowindow(marker, title);
          }

          itemEl.onmouseout = function () {
            infowindow.close();
          }
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
      }

      listEl && listEl.appendChild(fragment);
      if (resultEl) {
        resultEl.scrollTop = 0;
      }

      map.setBounds(bounds);
    }

    function getListItem(index: number, places: placeType) {
      const el = document.createElement("li");
      let itemStr = `
        <div class="info">
          <span class="marker marker_${index+1}">
            ${index+1}
          </span>
          <a href="${places.place_url}" target="_blank">
            <h5 class="info-item place-name">${places.place_name}</h5>
            ${
              places.road_address_name 
              ? `<span class="info-item road-address-name">
                  ${places.road_address_name}
                </span>
                <span class="info-item address-name">
                  ${places.address_name}
                  </span>`
              : `<span class="info-item address-name">
                  ${places.address_name}
                </span>`
            }
            <span class="info-item tel">
              ${places.phone}
            </span>
          </a>
        </div>
        `
      
      el.innerHTML = itemStr;
      el.className = "item";

      return el;
    }
  
    //마커를 생성하고 지도 위에 마커를 표시하는 함수
    function addMarker(position:any, idx:number, title:undefined) {
      var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
          imageSize = new window.kakao.maps.Size(36, 37),
          imgOptions =  {
            spriteSize : new window.kakao.maps.Size(36, 691),
            spriteOrigin : new window.kakao.maps.Point(0, (idx*46)+10),
            offset: new window.kakao.maps.Point(13, 37)
          },
          markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
          marker = new window.kakao.maps.Marker({
            position: position,
            image: markerImage 
          });

      marker.setMap(map);
      markers.push(marker);

      return marker;
    }

    //지도 위에 표시되고 있는 마커 모두 제거
    function removeMarker() {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    //검색결과 목록 하단에 페이지 번호를 표시하는 함수
    function displayPagination(pagination: {last: number, current: number, gotoPage: (arg0: number) => void}) {
      const paginationEl = document.getElementById('pagination') as HTMLElement;
      let fragment = document.createDocumentFragment();
      let i; 

      // 기존에 추가된 페이지번호를 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.lastChild &&
          paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i=1; i<=pagination.last; i++) {
        const el = document.createElement('a') as HTMLAnchorElement;
        el.href = "#";
        el.innerHTML = i.toString();

        if (i===pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = (function(i) {
            return function() {
              pagination.gotoPage(i);
            }
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    function displayInfowindow(marker:any, title:string) {
      const content = '<div style="padding:5px;z-index:1;" class="marker-title">' + title + '</div>';

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    function removeAllChildNods(el: HTMLElement) {
      while (el.hasChildNodes()) {
        el.lastChild &&
          el.removeChild (el.lastChild);
      }
    }
  }, [props.search])

  return (
    <div className='container'>
      <div id="map"></div>
      <div id="search-result">
        <p className='result-text'>
          <span className='result-keyword'>
            {props.search}
          </span>
          검색 결과
        </p>
        <div className='scroll-wrapper'>
          <ul id="places-list"></ul>
        </div>
        <div id="pagination"></div>
      </div>
    </div>
  );
}

export default Map;