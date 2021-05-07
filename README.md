
# Test Editor for Study


## 2021/04/15
- 마크업언어로 에디터 샘플 구현

## 2021/04/16  
- js로 동적 에디터 샘플 구현

## 2021/04/19
- 한 화면에 에디터 2개 동작하게 구현
- 추가 기능 (newPage버튼, 버튼DECO시 각 에디터마다 동작하게수정)

## 2021/04/26-30
- node.js 로컬서버(express) 구현   
- 이미지 업로드 기능 추가
   - multer모듈 사용
   - 현재 선택된 caret 혹은 range에 이미지 삽입 기능 구현
- Chrome > IE 호환테스트 
<pre>
<code>
IE9 호환테스트 진행 중 이슈
1. formData기능을 지원하지 않기 때문에 ajaxForm을 사용하여 formData를 넘겨주어야함
2. 이미지 업로드 > post 전송 > 이미지가 JSON파일로 다운로드 되는 현상 
  - 서버에서 response를 넘겨줄 때 Header Type을 "text-plain"으로 변경해주어야함
  - 변경해주어도 2개 이상의 에디터의 경우 JSON파일이 다운로드 된다면 이벤트 타겟을 현재 element로 특정지어줘야 현상이 일어나지 않음
3. closest, classList등 지원하지 않는 메소드가 존재하여 polyfill을 만들거나 MDN사이트를 참조하여 지원하는 브라우저를 확인했음
4. input(type=file)의 value값을 초기화하는 기능을 구현할 예정
  - ie외의 브라우저의 경우 (해당 element).value =""로 초기화가능
  - ie의 경우 inpute의 files데이터가 undefined이므로 브라우저별 분기처리필요
</code>
</pre>

## 2021/05/03-07  
- CKEditor를 modify하여 sampleEditor 구현
