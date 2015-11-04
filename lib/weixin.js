
		var j = 1;
		var play = true;
		function aj(){
			
				var xhr = new XMLHttpRequest();
				xhr.onload = function(){
						var response = xhr.responseText;
						if(response!=""){
						var response_alone = response.split(";");
						for(var i = 0 ;i<response_alone.length-1;i++){
							var response_array = response_alone[i].split(",");
							var response_name = response_array[0];
							var response_text = response_array[1];
							var response_img = response_array[2];
							console.log(response_img);
							$("#roll").append("<div class='talk'><img src='../img/empty_photo.png' alt= /><p class='talk_name'>爱谁谁:</p><p class='talk_word'>这个是例子</p></div>");
							$(".talk_name").eq(-1).text(response_name);
							$(".talk_word").eq(-1).text(response_text);
							$(".talk img").eq(-1).attr('src',response_img);
						}
						j=j+response_alone.length-2;

							$("#roll").animate({top:-95*j},600,function(){j++;});
						}
						aj();
						
					}
					
				
				xhr.open("get","long_ajax.php",true);
				xhr.send();

			}

		
		$(function(){
			console.log(sessionStorage.getItem('name_stroage'));
			if(sessionStorage.getItem('name_stroage')!==null||sessionStorage.getItem('img')!==null){
				$("#front").css('display','none');
				$("#back").css('display','block');
				var name_value = sessionStorage.getItem('name_stroage');
				var img_url = sessionStorage.getItem('img');
				$("#back img").attr('src',img_url);
				$("#back span").eq(1).text(name_value);
				$("#button_confrim_back").click(function(){
					$("#shadow,#alert_name").css('display','none');
				})
				$("#log_off").click(function(){
					$("#back").css('display','none');
					$("#front").css('display','block');
				})
			}
			$("#button_confrim").click(function(){
				if($('#alert_name input').val()==""){
					alert("名字不能为空");
					return false;
				}
				var name_value = $("#alert_name input").val();
				var img_url;
				if($("#head input").eq(0).prop("checked")==true){
					img_url="img/head0.jpg";
				}
				if($("#head input").eq(1).prop("checked")==true){
					img_url="img/head1.jpg";
				}
				if($("#head input").eq(2).prop("checked")==true){
					img_url="img/head2.jpg";
				}
				if($("#head input").eq(3).prop("checked")==true){
					img_url="img/head3.jpg";
				}
				if($("#head input").eq(4).prop("checked")==true){
					img_url="img/head4.jpg";
				}
				if($("#head input").eq(5).prop("checked")==true){
					img_url="img/head5.jpg";
				}
				if($("#head input").eq(6).prop("checked")==true){
					img_url="img/head6.jpg";
				}
				if($("#head input").eq(7).prop("checked")==true){
					img_url="img/head7.jpg";
				}
				console.log(img_url);
				sessionStorage.setItem('name_stroage',name_value);
				sessionStorage.setItem('img',img_url);
				$("#shadow,#alert_name").css('display','none');
				
			})

			aj();
			$("#reset").click(function(){
				$("textarea").val("");
			})

			$("#submit").click(function(){
				var text_value = $("textarea").val();
				var name_value = sessionStorage.getItem('name_stroage');
				var img_url = sessionStorage.getItem('img');
				if(text_value == ""){alert("输入不能为空");return false;}
				$.ajax({
					type:"POST",
					url:"weixin.php",
					data:{"name":name_value,"text":text_value,"img":img_url},
					success:function(){
						$("textarea").val("");
					},
					error:function(){
						alert("内部错误");
					}
				})
			})
			
		})