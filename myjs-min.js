$(document).ready((function(){var t;$.ajax({type:"get",url:"https://script.google.com/macros/s/AKfycbyiZeCCuyKTXQJXL3QiRcc7h0Ph6DfwFK4RtCi06zhGJ420f51-yxv1_9pcV35kFY9t4w/exec",success:function(t){var e=JSON.parse(t),a=e[0],n=e[1],s=e[2],c=e[3],l=e[4],r='<i class="material-icons copyBtn" title="複製答案">content_copy</i>';let o='<tr><th class="tg co1">題目</th><th class="tg co2">答案</th></tr>';for(var i=1;i<a.length;i++)o+='<tr class="qq"><td class="tg-1">'+a[i][0]+'</td><td class="tg-2">'+a[i][1]+r+"</td></tr>";for(i=1;i<n.length;i++)o+='<tr class="ko"><td class="tg-1">'+n[i][0]+'</td><td class="tg-2">'+n[i][1]+"</td></tr>";for(i=1;i<s.length;i++)o+='<tr class="tp"><td class="tg-1">'+s[i][0]+'</td><td class="tg-2">'+s[i][1]+"</td></tr>";document.getElementsByClassName("ques")[0].innerHTML=o;let p="";for(i=1;i<c.length;i++)p+='<tr class="gu"><td>'+c[i][0]+"</td><td>"+c[i][1]+"</td></tr>";document.getElementsByClassName("guwan-body")[0].innerHTML=p;let d="";for(i=1;i<l.length;i++)d+='<tr class="bu"><td>'+l[i][0]+"</td><td>"+l[i][1]+"</td></tr>";document.getElementsByClassName("buqhai-body")[0].innerHTML=d,$(".loading").css("display","none"),$(".table").on("click",".copyBtn",(function(){var t=$(this).parent().html().replace(r,"");navigator.clipboard.writeText(t);var e=$(".copied");e.css("opacity",1),e.animate({opacity:1},1e3).animate({opacity:0},300)}))}});var e=[],a=[0,0,0,0,0],n=$("#serType"),s=parseInt(n.val());function c(t){var e=0,a=$(t);for(i=0;i<a.length;i++){var n=a[i].getElementsByTagName("td")[0];if(n){var s=n.textContent||n.innerText;l(s=s.replace("“","").replace("”","").replace("「","").replace("」","").replace("《","").replace("》",""))?(a[i].style.display="",e++):a[i].style.display="none"}}return e}function l(t){for(var a=0;a<e.length;a++)if(-1==t.indexOf(e[a]))return!1;return!0}function r(){a=[0,0,0,0,0],t=$(".light-table-filter").val().replace("“","").replace("”","").replace("「","").replace("」","").replace("《","").replace("》","");var n=$(".table");$("tr");switch(0==t.length?n.css("display","none"):(n.css("display",""),e=t.split(" ")),s){case 1:a[0]=c(".qq");break;case 2:a[1]=c(".tp");break;case 3:a[2]=c(".ko");break;case 4:a[3]=c(".gu");break;case 5:a[4]=c(".bu");break;default:a[0]=c(".qq"),a[1]=c(".tp"),a[2]=c(".ko"),a[3]=c(".gu"),a[4]=c(".bu")}0==a[0]&&$(".qq").css("display","none"),0==a[1]&&$(".tp").css("display","none"),0==a[2]&&$(".ko").css("display","none"),a[0]+a[1]+a[2]==0&&$(".ques").css("display","none"),0==a[3]&&$(".guwan").css("display","none"),0==a[4]&&$(".buqhai").css("display","none"),a[0]+a[1]+a[2]+a[3]+a[4]==0?(n.css("display","none"),$(".none-search").css("display","")):$(".none-search").css("display","none")}$("#filterName").keyup((function(){r()}));var o=["輸入關鍵字","輸入題目關鍵字","輸入題目關鍵字","輸入題目關鍵字","輸入古玩關鍵字","輸入捕快案名關鍵字"];$("#serType").change((function(){s=parseInt($(this).val()),$(".search").attr("placeholder",o[s]),0!=$("#filterName").val().length&&r()})),$(".rpBtn").click((function(){window.open("report.html")})),$(".table > .copy-btn").click((function(){})),$(window).scroll((function(){document.getElementById("filterName").getBoundingClientRect().bottom<0?$(".gotop").fadeIn():$(".gotop").fadeOut()})),$(".gotop").click((function(){$("html,body").animate({scrollTop:0},"fast")})),$(".fa-question-circle").click((function(){$("#dialog").dialog()}))}));