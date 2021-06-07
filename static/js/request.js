$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};



$(document).ready(function (){
    $(".aim").click(function (){
            $.ajax({
            url: 'resp',
            type: 'get',
            data: {
                button_text: $(this).text()
            },
            success: function (response){
                $(".aim").text(response.info)
            }
        });
    });

    $("#submit").click(
            function(){
                sendAjaxForm('result_form', 'ajax_form', "http://127.0.0.1:8000/note/");
                return false;
            }
        );
    });

    function sendAjaxForm(result_form, ajax_form, url) {
        console.log($("#"+ajax_form).serializeObject())
    $.ajax({
        url:     url, //url страницы (action_ajax_form.php)
        type:     "POST", //метод отправки
        dataType: "html", //формат данных
        data: $("#"+ajax_form).serializeObject(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
        	//result = $.parseJSON(response);
        	console.log("2112");
        	// $('#result_form').html('Имя: '+result.name+'<br>Телефон: '+result.phonenumber);
    	},
    	error: function(response) { // Данные не отправлены
            console.log("ERROR");
            // $('#result_form').html('Ошибка. Данные не отправлены.');
    	}
 	});
};