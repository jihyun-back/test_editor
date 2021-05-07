
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
- 텍스트 서식 구현  
   - div내의 div에도 텍스트 서식이 동작하게 구현  
   - 텍스트 서식 적용 전/후 range보존하는 기능  
- indent, outdent 기능 구현
- bulleted, numbered 기능 구현
- 에디터 글꼴 변경 기능 구현
<pre>
<code>

   <1>  
   텍스트 서식 구현시에 div내의 div 그리고 p태그가 섞여있을 때 해당 태그를 찾아내서 서식을 적용시킬 때    
   nextSibling이니 parentNode니 재귀함수를 써서 구현했는데   
   지금 생각해보면 getElementsByTagName기능도 고려해봤으면 더 쉽지 않았을까?...    
     
   <2>  
   텍스트 서식이나 indent,outdnet든 서식 기능에 대한 버튼을 선택했을 때 서식은 적용되나 range가 보존되지 않았던 현상  
   range에 대해 set해주는 구문이 없어서 발생했던 것..  
   range.setStart(,,,)  
   range.setEnd(,,,)  
   혹은 range.selectNodeContents()등.. 고려하여 사용하면 될 것 같다.  
     
   <3>  
   indent,outdent를 구현할 때 execCommand를 사용했다가 margin값을 주는 것으로 수정하였다.  
     
   <4>  
   list 기능을 구현할 때 텍스트 서식처럼 문단단위로 bulleted, numbered를 구현하려 하였으나   
   1) ul, ol태그 내의 li 2) 서식 적용에 대한 경우의 수 고려 등의 이유로   
   execCommand를 사용하여 구현하였다( 기존의 todo-list기능도 추가하려 하다가 접었다 ㅠㅠ;; )  
     
   <5>  
   글꼴 변경 기능 구현시 span태그에 fontFamily를 추가하는 작업이었는데   
   문단단위로 span을 주고 중복되는 span에 대해 fontFamliy를 제거하는 기능으로 추가하였다.  
   더 가서는 현재 style이 적용되어 있지 않는 span태그를 찾아 remove하는 형식의 기능을 추가하려 한다.  
</code>
</pre>


> 추가로 남은 기능들에 대해 보완이 필요한 부분은 약간의 수정이 진행될 예정
   
