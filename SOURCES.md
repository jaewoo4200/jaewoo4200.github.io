# Content and image sources

Reviewed 2026-10-06. Existing profile, education and earlier project metrics come from the user's September 2026 resume and 3D portfolio. New content was cross-checked against the sources below.

## Capstone

The user supplied the capstone directory containing the 2026 final report and final presentation. The website summarizes the project and uses extracted project images; it does not publish the original report containing student IDs.

- Final report: `(결과보고서)[2026-1]-[키잉갓]-[백상현 교수님]-[드론 기반 스마트 교통 모니터링 및 사고관.pdf`, pp. 3–10.
- Final presentation: `2026-1_전자공학캡스톤디자인_최종발표회_키잉갓_최종.pptx`.
- `capstone-dashboard.webp`: detail crop of image3.png, retaining detection view, 2D scene and event log; local connection/path controls omitted.
- `capstone-rig.webp`: image27.jpeg; `capstone-drone.webp`: image16.png.
- `traffic.jpg`: original personal portfolio figure.
- Evaluation: 13,248 images, train/val/test 10,598/1,326/1,324; val mAP50–95 0.717 to 0.932, test 0.940; approximately 3.7 seconds in a scale-model demonstration. The reported values were not remeasured during website work.
- Personal contribution comes from the user's resume and portfolio; FPGA-controller implementation is attributed to a teammate.

## First paper

[DBpia record](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12964669) was opened in a browser and checked against the user's original paper: title, author order, June 2026 KICS Summer Conference proceedings, pp. 1942–1943.

The material-classification balanced accuracy (0.848) and 28 GHz comparison come from the original paper. They are not measured radio accuracy. Existing local paper and poster PDFs are retained.

## SEAM Studio and campus

- [SEAM README](https://github.com/jaewoo4200/SEAM): editor, dual material bindings, modes, Mock and Sionna backends, assignment review and result display.
- `seam.jpg`: project's official workbench screenshot.
- `campus.jpg`: user's personal portfolio, Seoul campus web map. Case study and September 2026 measurements come from the supplied portfolio. External spatial data/model use and evaluation scope are stated in the case study.

## Claude + Codex Usage

[Public repository](https://github.com/jaewoo4200/ClaudeUsage), inspected revision `71bc3d37c4d6fe61ad886c574c3d37dd4e9f1b30`.

The widget and menu images are official demo-data screenshots; the history view comes from the same repository. The images show application interfaces, not live user account values. Feature claims follow the README. Screens are converted to WebP for the portfolio. MIT license and copyright notice are preserved in `dist/assets/ClaudeUsage-LICENSE.txt` (or `assets/` in the flat ZIP).

## VocaNote

[Public repository](https://github.com/jaewoo4200/VocaNote), inspected revision `4d120603afab26deb20f4a9371169b02f7e0a93a`.

`vocanote-web.webp` is a browser screenshot of the user's [live web application](https://voca.ljw.app), captured on 2026-10-06 with a sample lookup for “wireless”. It contains no personal wordbook data. Features follow the README and the visible lookup interface. The repository has no explicit source license; the portfolio labels it as a Mac/web app with public source, without assigning it an MIT license.

## Reconstruct Digital Twin

[Public repository](https://github.com/jaewoo4200/reconstruct-digital-twin-skill), inspected revision `99dc3b91d33bbeb12bbe8157a421be1c1fa4cee5`.

The repository is a skill and workflow, without supplied room scans or finished building models. It is shown as a typographic toolkit entry rather than illustrating it with unrelated reconstruction images. Structural format checks are distinguished from target-runtime validation; the AODT adapter is not presented as a delivered executable feature. MIT notice is preserved in `assets/reconstruction-LICENSE.txt`.
