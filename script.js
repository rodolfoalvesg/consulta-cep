$(document).ready(function(){
    $("#consulta-cep").keyup(function() {
        let cep = $("#consulta-cep").val();
        const cont = cep.length;

        if(cont < 10){
            let valorDoPadrao = $(this).attr("valor");
            const saida = valorDoPadrao.substring(1,0);
            const texto = valorDoPadrao.substring(cont);
            
            if(texto.substring(0,1) != saida){
                $("#consulta-cep").val(cep += texto.substring(0,1));
            }
        }

    });

    $("button").click(function(){
        $("tbody").html("");
        $("#map").html("");
        let consultaCep = $("#consulta-cep").val();
        
        if(consultaCep.length == 10){
            for(let i in ".-"){
                consultaCep = consultaCep.replace(".-"[i], "")
            }
            console.log(consultaCep)
            
            $.ajax({
                url: `https://cep.awesomeapi.com.br/json/${consultaCep}`, 
                success: function(result){
                    const logradouro = result.address;
                    const bairro = result.district;
                    const localidade = result.city;
                    const uf = result.state;
                    const cep = result.cep;
                    const longitude = result.lng;
                    const latitude = result.lat;

                    console.log(localidade, longitude)

                    if(logradouro || bairro || localidade || uf || cep){
                        $("tbody").append(`<tr>
                            <td>${logradouro}</td>
                            <td>${bairro}</td>
                            <td>${localidade}/${uf}</td>
                            <td>${cep}</td>
                        </tr>`);

                        $("#map").append(`<iframe width="500" height="300" src="https://maps.google.com/maps?q=${latitude},${longitude}&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>`);
                    }
        
                    
            }})
            .fail(function(jqXHR, textStatus, msg){
                $("tbody").append($("tbody").append(`<tr>
                            <td colspan="4">O cep ${consultaCep} não foi encontrado ou não existe!</td>
                </tr>`));
            });
        }else{
            $("tbody").append(`<tr>
                        <td colspan="4">Formato de cep inválido!</td>
                    </tr>`);
        }
    });
});


