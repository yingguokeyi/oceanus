window.onload = function(){
	var gradesVal = localStorage.getItem('member_level');
	if(gradesVal == '1'){
		$('#grades_img').attr("src","../img/img_personal/pt.png");
		$('#pt_member img').attr("src","../img/img_personal/ptactive.png");
		$('#pt_tab').show();
	}
	if(gradesVal == '2'){
		$('#grades_img').attr("src","../img/img_personal/small.png");
		$('#small_member img').attr("src","../img/img_personal/smallactive.png");
		$('#small_tab').show();
		$('#pt_tab').hide();
		$('#big_tab').hide();
	}
	if(gradesVal == '3'){
		$('#grades_img').attr("src","../img/img_personal/big.png");
		$('#big_member img').attr("src","../img/img_personal/bigactive.png");
		$('#big_tab').show();
		$('#pt_tab').hide();
		$('#small_tab').hide();
	}
}
$(document).on('click','#pt_member',function(){
	$('#pt_member img').attr("src","../img/img_personal/ptactive.png");
	$('#small_member img').attr("src","../img/img_personal/smallunactive.png");
	$('#big_member img').attr("src","../img/img_personal/bigunactive.png");
	$('#pt_tab').show();
	$('#small_tab').hide();
	$('#big_tab').hide();
})
$(document).on('click','#small_member',function(){
	$('#small_member img').attr("src","../img/img_personal/smallactive.png");
	$('#pt_member img').attr("src","../img/img_personal/ptunactive.png");
	$('#big_member img').attr("src","../img/img_personal/bigunactive.png");
	$('#small_tab').show();
	$('#pt_tab').hide();
	$('#big_tab').hide();
})
$(document).on('click','#big_member',function(){
	$('#big_member img').attr("src","../img/img_personal/bigactive.png");
	$('#small_member img').attr("src","../img/img_personal/smallunactive.png");
	$('#pt_member img').attr("src","../img/img_personal/ptunactive.png");
	$('#big_tab').show();
	$('#pt_tab').hide();
	$('#small_tab').hide();
})
//联系客服
$(document).on("click", "#btn_contact", function() {
	layer.open({
		type: 1,
		content: $('.service').html(),
		anim: 'up',
		scrollbar: false,
		shadeClose: false,
		style: 'position:fixed;bottom:50%;left: 8%; right:8%;height: auto;border:none;border-radius:6px'
	
	});
	$(document).on("click", ".service_cancel", function() {
		layer.closeAll('page');
	});
})
//立即申请
$(document).on("click", "#btn_apply", function() {
	window.location.href = 'apply_stok.html';
})