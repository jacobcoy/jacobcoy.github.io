$('#btn').click(function(){
    //$('#result').text('')
    var url = "https://hooks.slack.com/services/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";
    var payload={"text": "This is a line of text in a channel.\nAnd this is another line of text."};
    
    $.post(url,JSON.stringify(payload),function(data){
        $('#result').text(data);
    })
})