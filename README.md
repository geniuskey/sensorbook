# SensorBook — 인터랙티브 이미지 센서 교과서

광자에서 사진까지. 공대 학부생을 위한 한국어 이미지 센서 학습 사이트입니다.
15개 챕터, 60여 개의 시뮬레이터, 3D 구조 모델(three.js)로 구성됩니다.

## 실행
빌드 과정이 없는 정적 사이트입니다.

```bash
python3 -m http.server 8000   # → http://localhost:8000
```
`index.html`을 브라우저로 바로 열어도 동작합니다. KaTeX, three.js, 폰트는 CDN에서 불러오므로 인터넷 연결이 필요합니다.

## 구성
| 장 | 파일 | 주제 |
|---|---|---|
| 01 | chapters/light.html | 빛과 광자, 흑체복사, 광자 수 계산 |
| 02 | chapters/photodiode.html | 밴드갭, 흡수 깊이, PN 접합, PPD, QE |
| 03 | chapters/pixel.html | 픽셀 적층 3D(FSI/BSI), 마이크로렌즈, 크로스토크, DTI |
| 04 | chapters/color.html | CFA, 분광 감도, 디모자이킹, OLPF |
| 05 | chapters/optics.html | 결상, F-넘버·심도, 회절, MTF, CRA, 렌즈 쉐이딩 |
| 06 | chapters/readout.html | 4T APS, CDS, 변환 이득, 컬럼 ADC, 칩 구조 |
| 07 | chapters/noise.html | 샷/읽기/암전류 노이즈, SNR, DR, PTC |
| 08 | chapters/characterization.html | 선형성, 암 특성 분포, RTS, 행 노이즈, 래그, 블랙 선, SNR10 |
| 09 | chapters/shutter.html | 롤링/글로벌 셔터, 플리커, HDR |
| 10 | chapters/isp.html | RAW→JPEG ISP 파이프라인, 3A |
| 11 | chapters/advanced.html | 적층 센서 3D, PDAF, 비닝, SPAD/dToF, 이벤트 센서 |
| 12 | chapters/automotive.html | LED 플리커 억제, 차량용 HDR 픽셀, 고온 동작, 기능 안전, DMS |
| 13 | chapters/space.html | 과학용 CCD, 방사선 손상과 CTE, HgCdTe·up-the-ramp, TDI, 광자 계수 |
| 14 | chapters/design.html | 센서 설계 플레이그라운드, 스펙시트 읽기 |
| 15 | chapters/glossary.html | 용어집(142개), 종합 퀴즈(26문항) |

공통 코드: `css/style.css`(디자인 토큰, 라이트/다크), `js/common.js`(내비게이션, 캔버스·차트·3D 헬퍼).
챕터 작성 규칙은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요.

시뮬레이터의 수치는 교육용 근사 모델입니다.

## 라이선스

Copyright © 2026 geniuskey. SensorBook은 코드와 교재 콘텐츠에 서로 다른 라이선스를 적용합니다.

- **코드: [MIT](LICENSE-MIT)** — JavaScript, CSS, Python, HTML 구조·레이아웃, HTML 안의 스크립트와 이벤트 핸들러에 적용합니다. 실행 코드의 사용 예시와 개발 문서(`CONTRIBUTING.md`, README의 실행·개발 안내)도 MIT입니다. 수정·재배포·상업적 이용이 가능하며, 저작권 및 라이선스 고지를 유지해야 합니다.
- **교재 콘텐츠: [CC BY 4.0](LICENSE-CC-BY-4.0)** — 본문, 수식 설명, 표, 문제·정답·해설, 그림(인라인 SVG 포함), 프로젝트가 직접 제작한 이미지에 적용합니다. 코드 안에 포함된 교재 문구·문제·해설과 시뮬레이터가 표현하는 원본 교육용 그림도 콘텐츠에 해당합니다. 복제·번역·수정·상업적 이용이 가능하며, 저작자와 출처, 라이선스 링크를 표시하고 변경한 경우 그 사실을 밝혀야 합니다. [공식 한국어 요약](https://creativecommons.org/licenses/by/4.0/deed.ko)을 참고하세요.

HTML 파일은 위 기준에 따라 코드와 콘텐츠를 구분합니다. 이 두 라이선스 중 하나를 임의로 선택하는 방식이 아닙니다. KaTeX, three.js, 외부 폰트 및 별도 출처·라이선스가 표시된 제3자 자료에는 해당 자료의 기존 라이선스가 적용됩니다.

콘텐츠 출처 표기 예시:

> SensorBook — geniuskey, https://sensorbook.euiyun.com/, CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). 원문을 번역하고 일부 내용을 수정함.

수정하지 않은 경우에는 마지막 변경 설명을 생략하고, 특정 챕터를 이용했다면 해당 챕터의 링크를 표시하세요.
