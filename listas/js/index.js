/**
 * camada 0 -> div inicial
 * camada 1 -> div chooseChecklist
 * camada 2 -> div checklist_selected
 * camada 3 -> div subtitle_selected
 */

//confirmation modal -> https://stackoverflow.com/questions/6929416/custom-confirm-dialog-in-javascript

//global vars
var divAtual;

var mapTitulos;
var mapSubtitulos;
var mapDescricao;

//variáveis de controlo
var checklistCarregada;
var numSubtitulo;
var subtitulo;
var desc;

//infos iniciais (designação e endereço do sitio web, entidade, data)
var designacaoSitioWeb;
var enderecoSitioWeb;
var entidade;
var data;

//colocar este codigo quando tiver um botao de exportar
    //guarda informações iniciais

//

//id unico para imagens
var _lastGenIdImg = 0;

//id unico para recursos
var _lastGenIdRecursos = 0;

var mapCheckboxes_10_asp_func = {};
var mapCheckboxes_conteudo = {};
var mapCheckboxes_transacao = {};

var mapNotas_10_asp_func = {};
var mapNotas_conteudo = {};
var mapNotas_transacao = {};

var mapRecursos_10_asp_func = {};
var mapRecursos_conteudo = {};
var mapRecursos_transacao = {};

var arrayImagensB64 = [];
var mapImagens_10_asp_func = {};
var mapImagens_conteudo = {};
var mapImagens_transacao = {};

var checkCorrespondente = {'S': "Sim", 'N': "Não", 'NA': 'Não Aplicável', 'NR': 'Não respondeu'};

function pageLoad(){

    divAtual = "0";

}

//Função voltar atrás

function goBack(){
    
    if(divAtual == "0.5"){ //carregar json - quando se carrega no botão laranja

        document.getElementById("divInputFiles").style.display = "none"; //esconde o input files
        document.getElementById("starUpPage").style.display = "block"; //mostra os botões iniciais
        document.getElementById("backArrow").style.visibility = "hidden"; 
        document.getElementById("footer_ama").style.position = "absolute";

        divAtual = "0";

    }else if(divAtual == "1"){ 

        var r = confirm("Deseja mesmo sair? Se voltar atrás vai perder todo o progresso, grave antes a sua avaliação." 
                        + "\n Clique 'OK' para saír."
                        + "\n Clique 'CANCEL' para permanecer na página.");
        if (r == true) {
            document.getElementById("chooseChecklist").style.display = "none"; //esconde camada 1
            document.getElementById("inicial").style.display = "block"; //mostra camada 0
            document.getElementById("backArrow").style.visibility = "hidden";
            document.getElementById("footer_ama").style.position = "absolute";
            divAtual = "0";
            document.getElementById("breadcrumb_formulario").style.display = "none";
        }
        

    } else if(divAtual == "2"){
        document.getElementById("checklist_selected").style.display = "none"; //esconde camada 2
        document.getElementById("chooseChecklist").style.display = "block"; //mostra camada 1
        //esconde progresso, conformidade e navegação
        document.getElementById("NAV_10_asp_func").style.display = "none";
        document.getElementById("divProgressBar_NAV_10_asp_func").style.display = "none";
        document.getElementById("NAV_conteudo").style.display = "none";
        document.getElementById("divProgressBar_NAV_conteudo").style.display = "none";
        document.getElementById("NAV_transacao").style.display = "none";
        document.getElementById("divProgressBar_NAV_transacao").style.display = "none";

        document.getElementById("footer_ama").style.position = "unset";
        divAtual = "1";
        document.getElementById("breadcrumb_checklist").style.display = "none";
        getProgressChecklists();

    } else if(divAtual == "3"){
        document.getElementById("subtitle_selected").style.display = "none"; //esconde camada 3
        document.getElementById("checklist_selected").style.display = "block"; //mostra camada 2

        document.getElementById("footer_ama").style.position = "unset";
        document.getElementById("breadcrumb_requisito").style.display = "none";
        divAtual = "2";
    } 
}

function clickBreadcumb(breadcrumbName){
    if(breadcrumbName === 'home'){
        var r = confirm("Deseja mesmo sair? Se clicar aqui vai perder todo o progresso, grave antes a sua avaliação." 
                        + "\n Clique 'OK' para saír."
                        + "\n Clique 'CANCEL' para permanecer na página.");
        if (r == true) {
            window.location.href = "https://selo.usabilidade.gov.pt/";
        }
    }else if(breadcrumbName === 'listas'){
        if(divAtual === "1"){
            goBack();
        }else if(divAtual === "2"){
            var r = confirm("Deseja mesmo sair? Se clicar aqui vai perder todo o progresso, grave antes a sua avaliação." 
                        + "\n Clique 'OK' para saír."
                        + "\n Clique 'CANCEL' para permanecer na página.");
            if (r == true) {

                document.getElementById("checklist_selected").style.display = "none"; //esconde camada 2
                document.getElementById("inicial").style.display = "block"; //mostra camada 0
                //esconde progresso, conformidade e navegação
                document.getElementById("NAV_10_asp_func").style.display = "none";
                document.getElementById("divProgressBar_NAV_10_asp_func").style.display = "none";
                document.getElementById("NAV_conteudo").style.display = "none";
                document.getElementById("divProgressBar_NAV_conteudo").style.display = "none";
                document.getElementById("NAV_transacao").style.display = "none";
                document.getElementById("divProgressBar_NAV_transacao").style.display = "none";

                document.getElementById("breadcrumb_checklist").style.display = "none";
                document.getElementById("breadcrumb_formulario").style.display = "none";

                document.getElementById("backArrow").style.visibility = "hidden";
                document.getElementById("footer_ama").style.position = "absolute";
                divAtual = "0";
            }
        }else if(divAtual === "3"){
            var r = confirm("Deseja mesmo sair? Se clicar aqui vai perder todo o progresso, grave antes a sua avaliação." 
                        + "\n Clique 'OK' para saír."
                        + "\n Clique 'CANCEL' para permanecer na página.");
            if (r == true) {

                document.getElementById("subtitle_selected").style.display = "none"; //esconde camada 3
                document.getElementById("inicial").style.display = "block"; //mostra camada 0
                //esconde progresso, conformidade e navegação
                document.getElementById("NAV_10_asp_func").style.display = "none";
                document.getElementById("divProgressBar_NAV_10_asp_func").style.display = "none";
                document.getElementById("NAV_conteudo").style.display = "none";
                document.getElementById("divProgressBar_NAV_conteudo").style.display = "none";
                document.getElementById("NAV_transacao").style.display = "none";
                document.getElementById("divProgressBar_NAV_transacao").style.display = "none";

                document.getElementById("breadcrumb_checklist").style.display = "none";
                document.getElementById("breadcrumb_formulario").style.display = "none";
                document.getElementById("breadcrumb_requisito").style.display = "none";

                document.getElementById("backArrow").style.visibility = "hidden";
                document.getElementById("footer_ama").style.position = "absolute";
                divAtual = "0";
            }

        }
    }else if(breadcrumbName === 'formulario'){
       if(divAtual === "2"){
            goBack();
        }else if(divAtual === "3"){
            goBack();
            goBack();
        }
    }else if(breadcrumbName === 'checklist'){
        if(divAtual === "3"){
            goBack();
        }
    }
}

//auxiliar
function getProgressAndConformidadeAux(map, nomeChecklist){
    var respondidas = 0;
    var numSim = 0;
    var totalChecks = 0;

    if(nomeChecklist == "10_asp_func"){
        totalChecks = 24;
    }else if(nomeChecklist == "conteudo"){
        totalChecks = 17;
    }else if(nomeChecklist == "transacao"){
        totalChecks = 13;
    }

    for(var index in map){
        if(map[index] != undefined ){

            if(map[index] != 'NR'){
                respondidas++;
                if(map[index] == 'S'){
                    numSim++;
                }else if(map[index] === 'NA'){
                    totalChecks--;
                }
            }
        }
    }

    var res = {respondidas: respondidas , numeroSim: numSim, totalChecks: totalChecks};
    return res;
}

function getProgressChecklists(){

    if(Object.keys(mapCheckboxes_10_asp_func).length == 0 ){
        document.getElementById("progress_10_asp_func").innerHTML = "Progresso: 0/24";
        document.getElementById("conformidade_10_asp_func").innerHTML = "Conformidade: 0/24 (0%)";
    }else {
        var res = getProgressAndConformidadeAux(mapCheckboxes_10_asp_func, "10_asp_func");
        if(res.respondidas == 0 ){

            document.getElementById("progress_10_asp_func").innerHTML = "Progresso: 0/24";
            document.getElementById("conformidade_10_asp_func").innerHTML = "Conformidade: 0/24 (0%)";
            
        }else{
            document.getElementById("progress_10_asp_func").innerHTML = "Progresso: "+ res.respondidas + "/24";
            var perc = ((res.numeroSim / res.totalChecks) * 100).toFixed(1);
            document.getElementById("conformidade_10_asp_func").innerHTML = "Conformidade: " + res.numeroSim + "/" + res.totalChecks + " ("+ perc + "%)";
        }
        
    }

    if(Object.keys(mapCheckboxes_conteudo).length == 0 ){
        document.getElementById("progress_conteudo").innerHTML = "Progresso: 0/17";
        document.getElementById("conformidade_conteudo").innerHTML = "Conformidade: 0/17 (0%)";
    }else {
        var res = getProgressAndConformidadeAux(mapCheckboxes_conteudo, "conteudo");
        if(res.respondidas == 0 ){
            document.getElementById("progress_conteudo").innerHTML = "Progresso: 0/17";
            document.getElementById("conformidade_conteudo").innerHTML = "Conformidade: 0/17 (0%)";
            
        }else{
            document.getElementById("progress_conteudo").innerHTML = "Progresso: "+ res.respondidas + "/17";
            var perc = ((res.numeroSim / res.totalChecks) * 100).toFixed(1);
            document.getElementById("conformidade_conteudo").innerHTML = "Conformidade: " + res.numeroSim + "/" + res.totalChecks + " ("+ perc + "%)";
        }
        
    }

    if(Object.keys(mapCheckboxes_transacao).length == 0  ){
        document.getElementById("progress_transacao").innerHTML = "Progresso: 0/13";
        document.getElementById("conformidade_transacao").innerHTML = "Conformidade: 0/13 (0%)";
    }else {
        var res = getProgressAndConformidadeAux(mapCheckboxes_transacao, "transacao");

        if(res.respondidas == 0 ){
            document.getElementById("progress_transacao").innerHTML = "Progresso: 0/13";
            document.getElementById("conformidade_transacao").innerHTML = "Conformidade: 0/13 (0%)";
            
        }else{
            document.getElementById("progress_transacao").innerHTML = "Progresso: "+ res.respondidas + "/13";
            var perc = ((res.numeroSim / res.totalChecks) * 100).toFixed(1);
            document.getElementById("conformidade_transacao").innerHTML = "Conformidade: " + res.numeroSim + "/" + res.totalChecks + " ("+ perc + "%)";
        }
        
    }
}

function getProgressoConformidadeChecklistSelected(nomeChecklist){

    if(nomeChecklist == "10_asp_func"){
        if(Object.keys(mapCheckboxes_10_asp_func).length == 0 ){
            document.getElementById("progresso_checklist_selected").innerHTML = "Progresso: 0/24";
            document.getElementById("conformidade_checklist_selected").innerHTML = "Conformidade: 0/24 (0%)";
        }else {
            var res = getProgressAndConformidadeAux(mapCheckboxes_10_asp_func, "10_asp_func");
            if(res.respondidas == 0 ){
    
                document.getElementById("progresso_checklist_selected").innerHTML = "Progresso: 0/24";
                document.getElementById("conformidade_checklist_selected").innerHTML = "Conformidade: 0/24 (0%)";
                
            }else{
                document.getElementById("progresso_checklist_selected").innerHTML = "Progresso: "+ res.respondidas + "/24";
                var perc = ((res.numeroSim / res.totalChecks) * 100).toFixed(1);
                document.getElementById("conformidade_checklist_selected").innerHTML = "Conformidade: " + res.numeroSim + "/" + res.totalChecks + " ("+ perc + "%)";
            }
            
        }
    }else if(nomeChecklist == "conteudo"){
        if(Object.keys(mapCheckboxes_conteudo).length == 0 ){
            document.getElementById("progresso_checklist_selected").innerHTML = "Progresso: 0/17";
            document.getElementById("conformidade_checklist_selected").innerHTML = "Conformidade: 0/17 (0%)";
        }else {
            var res = getProgressAndConformidadeAux(mapCheckboxes_conteudo, "conteudo");
            if(res.respondidas == 0 ){
                document.getElementById("progresso_checklist_selected").innerHTML = "Progresso: 0/17";
                document.getElementById("conformidade_checklist_selected").innerHTML = "Conformidade: 0/17 (0%)";
                
            }else{
                document.getElementById("progresso_checklist_selected").innerHTML = "Progresso: "+ res.respondidas + "/17";
                var perc = ((res.numeroSim / res.totalChecks) * 100).toFixed(1);
                document.getElementById("conformidade_checklist_selected").innerHTML = "Conformidade: " + res.numeroSim + "/" + res.totalChecks + " ("+ perc + "%)";
            }
        }
    }else if(nomeChecklist == "transacao"){
        if(Object.keys(mapCheckboxes_transacao).length == 0  ){
            document.getElementById("progresso_checklist_selected").innerHTML = "Progresso: 0/13";
            document.getElementById("conformidade_checklist_selected").innerHTML = "Conformidade: 0/13 (0%)";
        }else {
            var res = getProgressAndConformidadeAux(mapCheckboxes_transacao, "transacao");
    
            if(res.respondidas == 0 ){
                document.getElementById("progresso_checklist_selected").innerHTML = "Progresso: 0/13";
                document.getElementById("conformidade_checklist_selected").innerHTML = "Conformidade: 0/13 (0%)";
                
            }else{
                document.getElementById("progresso_checklist_selected").innerHTML = "Progresso: "+ res.respondidas + "/13";
                var perc = ((res.numeroSim / res.totalChecks) * 100).toFixed(1);
                document.getElementById("conformidade_checklist_selected").innerHTML = "Conformidade: " + res.numeroSim + "/" + res.totalChecks + " ("+ perc + "%)";
            }
            
        }
    }

}


function getProgressAndConformidadeBar(map, nomeChecklist, totalChecks){

    if(Object.keys(map).length == 0 ){
        document.getElementById("progressoInfo_NAV_" + nomeChecklist).innerHTML = "Progresso: 0/" + totalChecks;
        document.getElementById("conformidadeInfo_NAV_" + nomeChecklist).innerHTML = "Conformidade: 0/" + totalChecks + " (0%)";
    }else {
        var res = getProgressAndConformidadeAux(map, nomeChecklist);
        if(res.respondidas == 0 ){

            document.getElementById("progressoInfo_NAV_" + nomeChecklist).innerHTML = "Progresso: 0/" + totalChecks;
            document.getElementById("conformidadeInfo_NAV_" + nomeChecklist).innerHTML = "Conformidade: 0/" + totalChecks + " (0%)";
            
        }else{
            document.getElementById("progressoInfo_NAV_" + nomeChecklist).innerHTML = "Progresso: "+ res.respondidas + "/" + totalChecks;
            var perc = ((res.numeroSim / res.totalChecks) * 100).toFixed(1);
            document.getElementById("conformidadeInfo_NAV_" + nomeChecklist).innerHTML = "Conformidade: " + res.numeroSim + "/" + res.totalChecks + " ("+ perc + "%)";
        }
    }

    //Navegação dentro de cada Checklist para outras checklists
    if(nomeChecklist == "10_asp_func"){
        document.getElementById("NAV_10_asp_func").style.display = "none";
        document.getElementById("divProgressBar_NAV_10_asp_func").style.display = "inline-block";
        document.getElementById("NAV_conteudo").style.display = "inline-block";
        document.getElementById("divProgressBar_NAV_conteudo").style.display = "none";
        document.getElementById("NAV_transacao").style.display = "inline-block";
        document.getElementById("divProgressBar_NAV_transacao").style.display = "none";
    }else if(nomeChecklist == "conteudo"){
        document.getElementById("NAV_10_asp_func").style.display = "inline-block";
        document.getElementById("divProgressBar_NAV_10_asp_func").style.display = "none";
        document.getElementById("NAV_conteudo").style.display = "none";
        document.getElementById("divProgressBar_NAV_conteudo").style.display = "inline-block";
        document.getElementById("NAV_transacao").style.display = "inline-block";
        document.getElementById("divProgressBar_NAV_transacao").style.display = "none";
    }else if(nomeChecklist == "transacao"){
        document.getElementById("NAV_10_asp_func").style.display = "inline-block";
        document.getElementById("divProgressBar_NAV_10_asp_func").style.display = "none";
        document.getElementById("NAV_conteudo").style.display = "inline-block";
        document.getElementById("divProgressBar_NAV_conteudo").style.display = "none";
        document.getElementById("NAV_transacao").style.display = "none";
        document.getElementById("divProgressBar_NAV_transacao").style.display = "inline-block";
    }

}



/**
 * Funções Camada [0]  --  div inicial
 *
 */

//botão 'Começar nova avaliação'
function comecarNovaAvaliacao(){

    document.getElementById("inicial").style.display = "none"; //esconde camada 0
    document.getElementById("chooseChecklist").style.display = "block"; //mostra camada 1
    document.getElementById("backArrow").style.visibility = "visible"; //mostra a seta de voltar para trás
    document.getElementById("footer_ama").style.position = "unset";

    //criar breadcrumb para o formulário
    var aTag = document.getElementById('anchor_formulario');
    var breadcrumb = document.getElementById("breadcrumb_formulario");
    aTag.innerText = "Formulário";
    breadcrumb.style.display = "block";

    //designacao sitio web 
    $("#designacaoWebsite").val('');

    //endereco sitio web
    $("#enderecoWebsite").val('');

    //entidade
    $("#entidadeWebsite").val('');

    //data
    $("#dataAnalise").val('');

    mapCheckboxes_10_asp_func = {};
    mapCheckboxes_conteudo = {};
    mapCheckboxes_transacao = {};

    mapNotas_10_asp_func = {};
    mapNotas_conteudo = {};
    mapNotas_transacao = {};

    mapRecursos_10_asp_func = {};
    mapRecursos_conteudo = {};
    mapRecursos_transacao = {};

    mapImagens_10_asp_func = {};
    mapImagens_conteudo = {};
    mapImagens_transacao = {};

    getProgressChecklists();
    

    divAtual = "1";
}

//botão 'Carregar avaliação em curso'
function carregarAvaliacaoEmCurso(){
    
    document.getElementById("starUpPage").style.display = "none"; //esconde só os botões iniciais, deixa a imagem
    document.getElementById("divInputFiles").style.display = "block"; //mostra o input files
    document.getElementById("backArrow").style.visibility = "visible"; //mostra a seta de voltar para trás
    document.getElementById("footer_ama").style.position = "absolute";
    
    divAtual = "0.5";
}


//onChange input file
function uploadJson(event){
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);

    
    var x = document.getElementById('uploadJsonFile');
    
    if ('files' in x) {
      if (x.files.length !== 0) {
        document.getElementById("avancarCarregamentoDiv").style.display = "block";
      }
    } 
    
}


function onReaderLoad(event){
    var obj = JSON.parse(event.target.result);

    //designacao sitio web 
    designacaoSitioWeb = obj.websiteDesignation;
    $("#designacaoWebsite").val(designacaoSitioWeb);

    //endereco sitio web
    enderecoSitioWeb = obj.websiteAddress;
    $("#enderecoWebsite").val(enderecoSitioWeb);

    //entidade
    entidade = obj.entity;
    $("#entidadeWebsite").val(entidade);

    //data
    data = obj.date;
    $("#dataAnalise").val(data);

    //checkboxes
    mapCheckboxes_10_asp_func = obj.checkboxes_10_func_asp;
    mapCheckboxes_conteudo = obj.checkboxes_content;
    mapCheckboxes_transacao = obj.checkboxes_transaction;

    //notas
    mapNotas_10_asp_func = obj.notes_10_func_asp;
    mapNotas_conteudo = obj.notes_content;
    mapNotas_transacao = obj.notes_transaction;

    
    //recursos
    //mapRecursos_10_asp_func = obj.resources_10_func_asp;
    mapRecursos_10_asp_func = {};
    for(var i in obj.resources_10_func_asp){
        mapRecursos_10_asp_func[i] = [];
        for(var j in obj.resources_10_func_asp[i]){
            mapRecursos_10_asp_func[i].push(obj.resources_10_func_asp[i][j]);
        }
    }
    
     //mapRecursos_conteudo = obj.resources_content;
     mapRecursos_conteudo = {};
    for(var i in obj.resources_content){
        mapRecursos_conteudo[i] = [];
        for(var j in obj.resources_content[i]){
            mapRecursos_conteudo[i].push(obj.resources_content[i][j]);
        }
    }

    //mapRecursos_transacao = obj.resources_transaction;
    //mapRecursos_conteudo = obj.resources_content;
    mapRecursos_transacao = {};
    for(var i in obj.resources_transaction){
        mapRecursos_transacao[i] = [];
        for(var j in obj.resources_transaction[i]){
            mapRecursos_transacao[i].push(obj.resources_transaction[i][j]);
        }
    }

    //imagens
    //mapImagens_10_asp_func = obj.images_10_func_asp;
    mapImagens_10_asp_func = {};
    for(var i in obj.images_10_func_asp){
        mapImagens_10_asp_func[i] = [];
        for(var j in obj.images_10_func_asp[i]){
            mapImagens_10_asp_func[i].push(obj.images_10_func_asp[i][j]);
        }
    }

    // mapImagens_conteudo = obj.images_content;
    mapImagens_conteudo = {};
    for(var i in obj.images_content){
        mapImagens_conteudo[i] = [];
        for(var j in obj.images_content[i]){
            mapImagens_conteudo[i].push(obj.images_content[i][j]);
        }
    }

    // mapImagens_transacao = obj.images_transaction;
    mapImagens_transacao = {};
    for(var i in obj.images_transaction){
        mapImagens_transacao[i] = [];
        for(var j in obj.images_transaction[i]){
            mapImagens_transacao[i].push(obj.images_transaction[i][j]);
        }
    }

    _lastGenIdImg = obj.lastGenIdImg;
    _lastGenIdRecursos = obj.lastGenIdResources;


}


function avancarCarregamento(){
    
    document.getElementById("divInputFiles").style.display = "none"; //esconde div de carregamento do JSON 
    document.getElementById("starUpPage").style.display = "block"; //volta a mostrar os dois botoes iniciais, para quando voltar para trás estarem ah mostra
    document.getElementById("inicial").style.display = "none"; //esconde imagem inicial "Checklists AMA"
    document.getElementById("chooseChecklist").style.display = "block"; //mostra o div de escolha de checklists
    document.getElementById("footer_ama").style.position = "unset";

    divAtual = "1";

    //criar breadcrumb do formulário
    var aTag = document.getElementById('anchor_formulario');
    var breadcrumb = document.getElementById("breadcrumb_formulario");
    aTag.innerText = "Formulário";
    breadcrumb.style.display = "block";

    getProgressChecklists();

}


/**
 * Funções Camada [1]  --  div chooseChecklist
 */

 //botão de escolha de cada checklist
function openChecklist(nomeChecklist){
    divAtual = "2";
    var breadcrumbChecklist = '';
    if(nomeChecklist == "10_asp_func"){
        checklistCarregada = "10_asp_func"; //var global
        breadcrumbChecklist = "Checklist 10 Aspetos Funcionais";
        //preencheMaps();
        //document.getElementById("chooseChecklist").style.display = "none"; //esconde camada 1
        //document.getElementById("checklist_selected").style.display = "block"; //mostra camada 2
        //preencherListas();
        //document.title = "10 Aspetos Funcionais";
        document.getElementById("titulo_checklist").innerHTML = "10 Aspetos Funcionais";
        getProgressAndConformidadeBar(mapCheckboxes_10_asp_func, "10_asp_func", "24");


    }else if(nomeChecklist == "conteudo"){
        checklistCarregada = "conteudo"; //var global\
        breadcrumbChecklist = "Checklist Conteúdo";
        //preencheMaps();
        //document.getElementById("chooseChecklist").style.display = "none"; //esconde camada 1
        //document.getElementById("checklist_selected").style.display = "block"; //mostra camada 2
        //preencherListas();
        //document.title = "Conteúdo";
        document.getElementById("titulo_checklist").innerHTML = "Conteúdo";
        getProgressAndConformidadeBar(mapCheckboxes_conteudo, "conteudo", "17");

    }else if(nomeChecklist == "transacao"){
        checklistCarregada = "transacao"; //var global
        breadcrumbChecklist = "Checklist Transação";
        //preencheMaps();
        //document.getElementById("chooseChecklist").style.display = "none"; //esconde camada 1
        //document.getElementById("checklist_selected").style.display = "block"; //mostra camada 2
        //preencherListas();
        //document.title = "Transação";
        document.getElementById("titulo_checklist").innerHTML = "Transação";
        getProgressAndConformidadeBar(mapCheckboxes_transacao, "transacao", "13");
    }

    //criar breadcrumb para o checklist
    var aTag = document.getElementById('anchor_checklist');
    var breadcrumb = document.getElementById("breadcrumb_checklist");
    aTag.innerText = breadcrumbChecklist;
    breadcrumb.style.display = "block";
    document.getElementById("breadcrumb_requisito").style.display = "none";

    preencheMaps();
    getProgressoConformidadeChecklistSelected(nomeChecklist);
    document.getElementById("chooseChecklist").style.display = "none"; //esconde camada 1
    document.getElementById("checklist_selected").style.display = "block"; //mostra camada 2
    preencherListas();
    document.getElementById("subtitle_selected").style.display = "none"; //esconde camada 3

}


function preencheMaps (){
    mapTitulos = new Map();
	mapSubtitulos = new Map();
    mapDescricao = new Map();
    

    if(checklistCarregada == "10_asp_func"){
        //document.title = "10 Aspetos Funcionais";
        //document.getElementById("titulo_checklist").innerHTML = "10 Aspetos Funcionais";

        mapTitulos.set("1","MENUS DE NAVEGAÇÃO");
        mapTitulos.set("2","TÍTULOS E SUBTÍTULOS");
        mapTitulos.set("3","TABELAS DE DADOS");
        mapTitulos.set("4","ESTRUTURA DA INFORMAÇÃO");
        mapTitulos.set("5","GRÁFICOS E IMAGENS-LINK");
        mapTitulos.set("6","CONTRASTE");
        mapTitulos.set("7","PLAYERS");
        mapTitulos.set("8","ESTRUTURA DA PÁGINA");
        mapTitulos.set("9","SINTAXE DO HTML");
        mapTitulos.set("10","FICHEIROS PDF");
        
        mapSubtitulos.set("1.1","O menu de navegação deve estar estruturado como uma lista de opções");
        mapSubtitulos.set("1.2", "É possível selecionar as opções e as subopções do menu quer com rato quer com teclado");
        mapSubtitulos.set("1.3", "As imagens-link, caso existam no menu, devem ter o correspondente equivalente alternativo em texto");
        mapSubtitulos.set("2.1", "Existe um título 'H1' marcado na página");
        mapSubtitulos.set("2.2", "Existe uma marcação hierarquizada de títulos e subtítulos na página (h1...h6)");
        mapSubtitulos.set("3.1", "As células que constituem os cabeçalhos da tabela estão marcadas com o elemento th");
        mapSubtitulos.set("3.2", "A legenda da tabela está marcada com o elemento caption");
        mapSubtitulos.set("4.1", "Ao clicar com o rato na etiqueta, o cursor surge no respetivo campo de edição");
        mapSubtitulos.set("4.2", "É possível identificar os campos de preenchimento obrigatório quando se usa apenas um leitor de ecrã");
        mapSubtitulos.set("4.3", "É possível localizar e ler as mensagens de erro usando apenas um leitor de ecrã");
        mapSubtitulos.set("5.1", "A imagem ou gráfico tem um equivalente alternativo em texto curto e correto");
        mapSubtitulos.set("5.2", "O gráfico é acompanhado de uma descrição longa");
        mapSubtitulos.set("5.3", "As imagens-link têm um equivalente alternativo correto");
        mapSubtitulos.set("6.1", "No corpo de um documento, o rácio de contraste entre a cor do texto normal (menor que 18 pontos ou menor que 14 pontos negrito) e a cor do fundo é superior a 4,5:1");
        mapSubtitulos.set("6.2", "O rácio de contraste entre a cor do texto de tamanho grande (maior ou igual que 18 pontos ou maior ou igual que 14 pontos negrito) e a cor do fundo é superior a 3:1");
        mapSubtitulos.set("7.1", "Deve ser possível ativar os botões de controlo do leitor quer com o rato quer com o teclado");
        mapSubtitulos.set("7.2", "O vídeo ou o áudio deve conter preferencialmente legendas fechadas sincronizadas. Caso não seja possível, no mínimo, deve disponibilizar-se uma transcrição textual");
        mapSubtitulos.set("8.1", "Quando se retira a CSS, todos os elementos HTML devem alinhar à esquerda");
        mapSubtitulos.set("8.2", "Quando se retira a CSS, a informação aparece numa ordem lógica");
        mapSubtitulos.set("8.3", "Quando se retira a CSS, deve ser possível reconhecer a semântica dos diversos elementos");
        mapSubtitulos.set("8.4", "Quando se retira a CSS, a informação relevante permanece visível");
        mapSubtitulos.set("8.5", "A maquetização da página é feita sem recorrer ao elemento table");
        mapSubtitulos.set("9.1", "A página apresenta-se sem erros de (x)HTML");
        mapSubtitulos.set("10.1", "Nos ficheiros PDF é possível, no mínimo, extrair o conteúdo textual para formato TXT");
    
        mapDescricao.set("1.1", "Para que possa ser bem interpretado por tecnologias de apoio, os menus e submenus devem estar estruturados com elementos nativos, do tipo ul, ou com a semântica e o estado dos elementos identificados com técnicas em ARIA.");
        mapDescricao.set("1.2", "Deve ser possível percorrer a estrutura de navegação quer com um dispositivo apontador quer com o teclado.");
        mapDescricao.set("1.3", "As imagens corretamente legendadas permitem ser interpretadas como texto, tornando todas as opções de navegação acessíveis.");
        mapDescricao.set("2.1", "O título principal de cada página, que sumariza o seu conteúdo, deve ser identificado como o primeiro nível dos títulos (h1). Não deverá ser utilizado mais do que um h1 por página.");
        mapDescricao.set("2.2", "Os títulos são empregues de forma hierárquica para melhor estruturar os conteúdos, das informações mais gerais às mais particulares. Deverão ser usados de forma consistente por todo o sítio Web.");
        mapDescricao.set("3.1", "Identificar os cabeçalhos de uma tabela ajuda a melhor identificar os eixos que caracterizam a informação em cada célula.");
        mapDescricao.set("3.2", "Todas as tabelas deverão conter uma legenda descritiva do seu conteúdo, incluindo as fontes da informação, se necessário.");
        mapDescricao.set("4.1", "De forma a tornar a seleção de campos pequenos mais fácil, a legenda deverá estar associada ao campo respetivo com o elemento label, pois desta forma aumenta-se a sua área clicável. Para os utilizadores de leitores de ecrã (pessoas cegas) a associação da etiqueta ao campo de edição é também fundamental.");
        mapDescricao.set("4.2", "Os campos obrigatórios devem ser preferencialmente agrupados na parte inicial de um formulário e claramente identificados como tal. Se não for possível, cada campo deverá estar identificado textualmente ou como Obrigatório ou como Opcional. Não deverão ser usados apenas símbolos ou cores como elemento identificador.");
        mapDescricao.set("4.3", "Os erros identificados no decorrer do preenchimento de um formulário deverão preferencialmente ser listados de forma condensada, direcionando cada elemento da lista ao respetivo campo. Cada campo deverá associar a mensagem de erro a si próprio. As mensagens de erro deverão ser breves e claras.");
        mapDescricao.set("5.1", "As imagens não decorativas deverão ter uma descrição breve associada, nomeadamente através do uso do atributo ALT. Esta legenda deve descrever fielmente o propósito da imagem no contexto em que se encontra.");
        mapDescricao.set("5.2", "Gráficos resultantes de análise de dados deverão ser acompanhados da tabela de dados que lhe deu origem, de forma a preservar o acesso à informação completa.");
        mapDescricao.set("5.3", "As hiperligações compostas apenas por uma imagem obrigam que esta tenha um equivalente alternativo em texto que represente fielmente o destino da hiperligação.");
        mapDescricao.set("6.1", "Deve assegurar-se no corpo do documento que o rácio de contraste entre a cor do texto e a cor de fundo é, no mínimo, de 4,5:1, de forma a assegurar a sua legibilidade para utilizadores com deficiências da visão.");
        mapDescricao.set("6.2", "Os textos de tamanho superior a 18 pontos, ou os textos de tamanho superior a 14 pontos mas a negrito, devem assegurar um rácio de contraste mínimo de 3:1 entre a cor do texto e a cor do fundo.");
        mapDescricao.set("7.1", "Os leitores de multimédia não devem iniciar automaticamente a reprodução dos elementos e têm de ser operáveis usando apenas um rato ou usando apenas um teclado.");
        mapDescricao.set("7.2", "O uso de legendas fechadas destina-se essencialmente a pessoas surdas. Recomendam-se para a produção das referidas legendas técnicas de tradaptação conhecidas para o efeito bem como o enriquecimento das legendas de sons cuja mensagem não seja percetível visualmente (por ex., o toque de uma campaínha de uma porta). Para vídeos com mensagens eminentemente visuais (por ex., um vídeo com música de fundo que passa um conjunto de mensagens apenas percetíveis à visão), os mesmos devem ter uma versão equivalente alternativa com produção de audiodescrição. A audiodescrição é fundamental para que pessoas cegas ou com baixa visão possam percecionar a mensagem veiculada.");
        mapDescricao.set("8.1", "Quando se desativam todos os estilos visuais, o conteúdo da página é apresentado alinhado à esquerda e apresenta-se de forma linear.");
        mapDescricao.set("8.2", "Tendo em conta que o posicionamento de elementos no código pode não refletir a ordem visual de leitura, deve ser assegurada a ordem correta do conteúdo quando se desativam os estilos visuais.");
        mapDescricao.set("8.3", "Os elementos que estruturam o conteúdo devem estar semanticamente bem estruturados, usando os elementos de HTML apropriados a cada tipo de conteúdo, como títulos, parágrafos, listas, ...");
        mapDescricao.set("8.4", "Toda a informação visível deve permanecer na página sob forma textual, quando se desativam os estilos visuais.");
        mapDescricao.set("8.5", "A estrutura de composição gráfica da página não é feita recorrendo a elementos de tabela mas sim a uma maior diversidade de elementos semânticos (por ex., main) e genéricos (por ex., div), que permitem a recomposição visual para diferentes tipos e dimensões de ecrã.");
        mapDescricao.set("9.1", "A página não deve apresentar erros de sintaxe de (x)HTML.");
        mapDescricao.set("10.1", "Os ficheiros PDF devem ter o seu texto inteiramente extraível para que se possa passar o respetivo conteúdo para um processador de texto sem perda de informação.");
    
    }else if(checklistCarregada == "conteudo"){
        //document.title = "Conteúdo";
        //document.getElementById("titulo_checklist").innerHTML = "Conteúdo";

        mapTitulos.set("1", "CLAREZA DO CONTEÚDO"); 
        mapTitulos.set("2", "USABILIDADE DO CONTEÚDO");
        mapTitulos.set("3", "ESTRUTURA DA NAVEGAÇÃO");
        mapTitulos.set("4", "ESTRUTURA DA INFORMAÇÃO");
        mapTitulos.set("5", "ELEMENTOS INTERATIVOS");
        
        mapSubtitulos.set("1.1", "O sítio Web apresenta um resumo breve");
        mapSubtitulos.set("1.2", "Os termos mais complexos têm uma definição agregada");
        mapSubtitulos.set("1.3", "Cada bloco de conteúdo contém a sua data de atualização");
        mapSubtitulos.set("1.4", "A informação sobre a entidade responsável pelo conteúdo está em todas as páginas");
        mapSubtitulos.set("2.1", "O tipo de letra do corpo do documento é adequado e o tamanho da letra é, no mínimo, de 12 pontos");
        mapSubtitulos.set("2.2", "A informação secundária (datas, autores) utiliza, no mínimo, um tamanho de letra de 10 pontos");
        mapSubtitulos.set("2.3", "Blocos e linhas de texto com largura não superior a 100 caracteres");
        mapSubtitulos.set("2.4", "O espaçamento entre linhas não é inferior a 1.5x o tamanho da letra");
        mapSubtitulos.set("3.1", "Nenhum nível de navegação tem mais de 9 opções");
        mapSubtitulos.set("3.2", "A navegação principal está sempre visível e sempre no mesmo local");
        mapSubtitulos.set("3.3", "As hiperligações de texto não devem ser diferenciadas apenas com base na cor");
        mapSubtitulos.set("4.1", "Os documentos longos têm um índice no topo com hiperligações internas para o mesmo");
        mapSubtitulos.set("4.2", "O layout do sítio Web é adaptável a plataformas móveis sem necessidade de efetuar varrimento horizontal");
        mapSubtitulos.set("5.1", "Não existem elementos interativos acionados apenas com a passagem do rato (hover)");
        mapSubtitulos.set("5.2", "Os elementos interativos têm uma dimensão mínima de 44px CSS (44 pontos) (vertical e horizontal)");
        mapSubtitulos.set("5.3", "Há apenas um botão de ação principal por página e o mesmo encontra-se destacado");
        mapSubtitulos.set("5.4", "Elementos gráficos interativos têm de aparentar ser clicáveis");
    
        mapDescricao.set("1.1", "Num primeiro vislumbre do sítio Web deve ser visível uma breve definição do seu propósito que dê a indicação ao utilizador de que sítio Web se trata e quais são as tarefas que se podem levar a efeito.");
        mapDescricao.set("1.2", "Quando são usados termos complexos ou técnicos que não sejam de uso corrente, estes devem ter agregada uma definição. Todos os termos definidos desta forma devem fazer parte de um glossário disponível no sítio Web.");
        mapDescricao.set("1.3", "Cada bloco de conteúdo isolado ou conjunto de blocos de conteúdo relacionado deverá ter a data da sua atualização associada, expressa num tamanho de letra 2 pontos abaixo ao do corpo do texto, com contraste mais reduzido mas nunca inferior a 4,5:1.");
        mapDescricao.set("1.4", "A identificação da entidade responsável pelos conteúdos produzidos, incluindo uma hiperligação para a página de contactos deverá constar do rodapé de todas as páginas.");
        mapDescricao.set("2.1", "De forma a assegurar a boa legibilidade do texto para todos os utilizadores, o tamanho de letra do texto que compõe o corpo do documento deverá ser, no mínimo, de 12 pontos, assegurando sempre que os mesmos são escaláveis para tamanhos superiores, sempre que o utilizador considere necessário.");
        mapDescricao.set("2.2", "A informação secundária, como os autores de textos ou de imagens, as datas de publicação ou outros tipos de meta-informação, podem usar tamanhos de letra mais pequenos, mas, no mínimo, com 10 pontos, assegurando sempre que os mesmos são escaláveis para tamanhos superiores, sempre que o utilizador considere necessário.");
        mapDescricao.set("2.3", "Para manter o conforto de leitura, os blocos ou linhas de texto não deverão ter mais de 100 caracteres de largura. Os 80 caracteres correspondem à dimensão que se apresenta nos estudos como a mais confortável para os utilizadores.");
        mapDescricao.set("2.4", "Para assegurar a leitura confortável de blocos de texto deve ser usado um espaçamento entre linhas de 1.5x o tamanho da letra.");
        mapDescricao.set("3.1", "A navegação principal deve ser equilibrada, nem com demasiadas opções de topo sem opções secundárias, nem com poucas opções de topo e muitas opções secundarias. Nenhum nível de navegação deve ter mais de 9 opções.");
        mapDescricao.set("3.2", "As opções de primeiro nível da navegação principal estão sempre visíveis e encontram-se sempre no mesmo local em todas as páginas. A posição atual do utilizador na estrutura de navegação deve ser evidenciada.");
        mapDescricao.set("3.3", "As hiperligações de texto devem apresentar um contraste mínimo de 4,5:1 com a envolvente e uma representação visual complementar à cor - idealmente as hiperligações devem apresentar-se sublinhadas. As hiperligações em texto devem apresentar-se da mesma forma em todo o sítio Web.");
        mapDescricao.set("4.1", "Os documentos com mais de três ecrãs de altura deverão ter a hierarquia de cabeçalhos espelhada num índice no topo da página com hiperligações internas para as respetivas secções e subsecções.");
        mapDescricao.set("4.2", "O layout do sítio Web deve ser adaptável aos tamanhos mais comuns de visualização, adaptando-se a várias larguras de ecrã sem que surjam barras de varrimento horizontais.");
        mapDescricao.set("5.1", "Não devem existir elementos de interação, como hiperligações ou botões, que aparecem apenas quando se passa por cima com um dispositivo apontador. Este método de interação não está disponível em aparelhos com interação por toque.");
        mapDescricao.set("5.2", "De forma a assegurar que todos os elementos interativos são facilmente acionáveis por qualquer tipo de dispositivo apontador ou toque, estes devem ter a dimensão mínima de 44px CSS de altura e de largura.");
        mapDescricao.set("5.3", "Deve existir apenas um botão de ação principal por página e o mesmo deve apresentar-se numa cor contrastante. Todos os outros botões devem ser considerados como secundários.");								
        mapDescricao.set("5.4", "Os elementos gráficos clicáveis devem ser percecionáveis como tal, através da forma, da cor ou do aparente volume.");

    }else if(checklistCarregada == "transacao"){
        //document.title = "Transação";
        //document.getElementById("titulo_checklist").innerHTML = "Transação";

        mapTitulos.set("1", "FORMULÁRIOS"); 
        mapTitulos.set("2", "CAMPOS");
        mapTitulos.set("3", "RESPOSTA");
        mapTitulos.set("4", "ERROS");
        
        mapSubtitulos.set("1.1", "A sequência de tabulação entre campos segue a sequência de preenchimento");
        mapSubtitulos.set("1.2", "Os formulários com mais de 2 ecrãs de altura devem ser distribuídos por várias páginas");
        mapSubtitulos.set("1.3", "Os formulários com mais de uma página têm a sequência de passos ilustrada");
        mapSubtitulos.set("2.1", "O tamanho dos campos deve refletir o tamanho previsível dos dados");
        mapSubtitulos.set("2.2", "É usada revelação progressiva em vez de campos inativos");
        mapSubtitulos.set("2.3", "As legendas dos campos são breves e claras");
        mapSubtitulos.set("2.4", "Campos obrigatórios devem ser claramente indicados como tal");
        mapSubtitulos.set("3.1", "Em ações longas, o sistema deve indicar o que está a acontecer");
        mapSubtitulos.set("3.2", "Deve ser confirmado o sucesso da transação/envio de informação");
        mapSubtitulos.set("4.1", "A informação já introduzida deve poder ser corrigida a qualquer momento");
        mapSubtitulos.set("4.2", "As ações destrutivas nunca devem ser permanentes, deve ser sempre possível desfazer a operação");
        mapSubtitulos.set("4.3", "As mensagens de erro são claramente identificadas junto aos campos de origem");
        mapSubtitulos.set("4.4", "As mensagens de erro devem mostrar os passos concretos para a resolução dos mesmos");
    
        mapDescricao.set("1.1", "A ordem de tabulação por entre os campos deve corresponder à sequência normal de preenchimento do formulário.");
        mapDescricao.set("1.2", "Os formulários não devem ser apresentados de forma excessivamente longa. Os formulários que ocupem mais de 2 ecrãs de altura devem ser distribuídos por tantos ecrãs quantos os necessários, para cumprir com esta regra. Os formulários longos podem também ter vários momentos de interação diferidos, solicitando ao utilizador a informação absolutamente necessária em cada etapa, em oposição à solicitação de toda a informação necessária logo num primeiro momento de interação.");
        mapDescricao.set("1.3", "Os formulários distribuídos por várias páginas devem indicar no topo da página a sequência de passos necessária para os concluir, juntamente com a designação de cada passo. O utilizador deve ser capaz de selecionar os passos anteriores para retornar aos ecrãs respetivos e, se necessário, corrigir informação.");
        mapDescricao.set("2.1", "O tamanho dos campos deve refletir o tamanho previsível para a entrada dos dados. Por exemplo, um campo para telefone deve ter a largura estritamente necessária para conter todos os dígitos. Nem mais nem menos.");
        mapDescricao.set("2.2", "Em vez de mostrar campos inativos, o formulário deve esconder os campos dependentes do campo-chave sempre que este não tenha sido ativado. Ao ativar o campo-chave são exibidos os campos que dependem da condição nele definida.");
        mapDescricao.set("2.3", "As legendas associadas aos campos devem ser claras e o mais breves possível, sem recorrer a grandes explicações. Se essas explicações forem necessárias, devem ser apresentadas num bloco de texto paralelo.");
        mapDescricao.set("2.4", "A identificação não deve basear-se apenas na cor. A sinalética visual de identificação deve ser notória. Deve ser disponibilizado um equivalente alternativo compatível com as tecnologias de apoio usadas por utilizadores com necessidades especiais.");
        mapDescricao.set("3.1", "O sistema deve indicar o que está a processar ou qual o tempo de espera expectável quando o utilizador desencadeia ações que levem a este comportamento.");
        mapDescricao.set("3.2", "O sucesso de uma transação deve ser claramente comunicado ao utilizador através de uma mensagem de confirmação.");
        mapDescricao.set("4.1", "Toda a informação já transmitida pelo utilizador numa sessão pode ser corrigida, em qualquer momento, antes da transação ser finalizada.");
        mapDescricao.set("4.2", "O utilizador deve poder recuperar de qualquer ação que tenha tomado durante a sessão.");
        mapDescricao.set("4.3", "As mensagens de erro devem ser apresentadas claramente associadas aos campos a que dizem respeito. Isto não invalida a necessidade de as apresentar numa lista sumário. Esta última técnica é particularmente útil em páginas longas.");
        mapDescricao.set("4.4", "As mensagens de erro devem ser claras e sucintas, não expondo desnecessariamente o utilizador a mecanismos internos do sistema, explicando claramente os passos necessários para que o utilizador resolva o problema.");
        
    }
}

//onChange designacao website
function designacaoWebsite_change(designacao){
    designacaoSitioWeb = designacao;
}


//onChange endereco website
function enderecoWebsite_change(endereco){
    enderecoSitioWeb = endereco;
}


//onChange entidade website
function entidadeWebsite_change(ent){
    entidade = ent;
}

//onChange data website
function dataAnalise_change(d){
    data = d;
}


function preencherListas(){
    //checklistCarregada = localStorage.getItem("checklistCarregada");
    var mapCheckboxes;
    var mapNotas;

    if(checklistCarregada == "10_asp_func"){
        mapCheckboxes = mapCheckboxes_10_asp_func;
        mapNotas = mapNotas_10_asp_func;
    }else if(checklistCarregada == "conteudo"){
        mapCheckboxes = mapCheckboxes_conteudo;
        mapNotas = mapNotas_conteudo;
    }else if(checklistCarregada == "transacao"){
        mapCheckboxes = mapCheckboxes_transacao;
        mapNotas = mapNotas_transacao;
    }
    

    var html='';
    html += '<table>';
    html += '<tr> <th style="text-align:center;"> Resposta </th> <th style="position: absolute;margin-left: 25px;"> Teste </th> </tr>';
    
    for(var t of mapTitulos){
        html += '<tr> <td></td>';
        html += '<td style="font-weight: bold; padding-left:25px; margin-bottom:15px; margin-top:15px; padding-top: 10px;padding-bottom: 10px;">' + t[0]+ ' '+ t[1] + '</td>';
        html += '</tr>';
        
        
        for(var st of mapSubtitulos){
            

            var numST = st[0].split(".");
            
            if( numST[0] === t[0] ){
                var idResposta = "X|"+st[0]+"|"+checklistCarregada;
                html += '<tr>';

                if(mapCheckboxes != null){ //se o dicionario nao estiver a null (não é a primeira vez)
                    if(mapCheckboxes[st[0]] != null){ //se o subtitulo atual jáh tem resposta na checkbox
                        if(mapCheckboxes[st[0]] == 'S'){
                            html += '<td style="width:25px; padding-left:20px;"> '+'<input type="text" value="S" style="width:30px; text-align:center; background-color:#90EE90;" id="'+ idResposta +'" disabled name="option"/> </td>';
                        }else if(mapCheckboxes[st[0]] == 'N'){
                            html += '<td style="width:25px; padding-left:20px;"> '+'<input type="text" value="N" style="width:30px; text-align:center; background-color:#FA8072;" id="'+ idResposta +'" disabled name="option"/> </td>';
                        }else if(mapCheckboxes[st[0]] == 'NA'){
                            html += '<td style="width:25px; padding-left:20px;"> '+'<input type="text" value="NA" style="width:30px; text-align:center; background-color:#BEBEBE" id="'+ idResposta +'" disabled name="option"/> </td>';
                        }else if(mapCheckboxes[st[0]] === 'NR' && mapNotas[st[0]].includes("NECESSITA DE VERIFICAÇÃO HUMANA") ){
                            html += '<td style="width:25px; padding-left:20px;"> '+'<input type="text" value="V" style="width:30px; text-align:center; background-color:#FFFF66;" id="'+ idResposta +'" disabled name="option"/> </td>';
                        }else{ //se não tem resposta poe NR
                            html += '<td style="width:25px; padding-left:20px;"> '+'<input type="text" value="NR" style="width:30px; text-align:center; background-color:#FFFFFF;" id="'+ idResposta +'" disabled name="option"/> </td>';
                        }
                        //html += '<td style=width:25px;> '+'&nbsp'+'&nbsp'+'&nbsp'+'&nbsp'+'<input type="text" value="'+mapCheckboxes[st[0]]+'" style="width:30px; text-align:center;" id="'+ idResposta +'" disabled="true" name="option"/> </td>';
                    }else{ //se não tem resposta nem nota de ação HUMANA poe NR
                        html += '<td style="width:25px; padding-left:20px;"> '+'<input type="text" value="NR" style="width:30px; text-align:center; background-color:#FFFFFF;" id="'+ idResposta +'" disabled name="option"/> </td>';
                    }
                }else{ //eh a primeira vez, o dicionario estah a null, poe 'NR'
                    html += '<td style="width:25px; padding-left:20px;"> '+'<input type="text" value="NR" style="width:30px; text-align:center; background-color:#FFFFFF;" id="'+ idResposta +'" disabled name="option"/> </td>';
                
                }
                
                var obj = {
                    titulo : t[0],
                    subtitulo : st[0]
                };

                var myJSON = JSON.stringify(obj);

                //na linha abaixo tinha o href para a página de subtitulo.html
                html += '<td style="padding-left:40px;"><a href="#" id="sub_'+st[0]+'" style=" color: black; text-decoration: underline; cursor: pointer;" onclick=openSubtitle('+myJSON+')>'+st[0]+' '+ st[1] + '</a></td>';
                html += '</tr>';
            }
            
        }
        //html += '<tr><td></td><td></td></tr>';	
        
    }
    
    html += '</table>';
                
    document.getElementById("lista-titulos-subtitulos").innerHTML = html;
}



function exportProgressJson(){

        var objToExtract = {};

        designacaoSitioWeb = document.getElementById('designacaoWebsite').value;
        enderecoSitioWeb = document.getElementById('enderecoWebsite').value;
        entidade = document.getElementById('entidadeWebsite').value;
        data = document.getElementById('dataAnalise').value;


        objToExtract.websiteDesignation = designacaoSitioWeb;
        objToExtract.websiteAddress = enderecoSitioWeb;
        objToExtract.entity = entidade;
        objToExtract.date = data;
        objToExtract.lastGenIdImg = _lastGenIdImg;
        objToExtract.lastGenIdResources = _lastGenIdRecursos;

        //checkboxes
        var objCheckBoxes_10_asp_func = {};
        var objCheckBoxes_conteudo = {};
        var objCheckBoxes_transacao = {};

        //notas
        var objNotas_10_asp_func = {};
        var objNotas_conteudo = {};
        var objNotas_transacao = {};

        //recursos
        var objRecursos_10_asp_func = {};
        var objRecursos_conteudo = {};
        var objRecursos_transacao = {};

        //Imagens
        var objImagens_10_asp_func = {};
        var objImagens_conteudo = {};
        var objImagens_transacao = {};

        //Checkboxes 10 aspetos funcionais
        for (var nST in mapCheckboxes_10_asp_func){
            objCheckBoxes_10_asp_func[nST] = mapCheckboxes_10_asp_func[nST];
        }
        objToExtract.checkboxes_10_func_asp = objCheckBoxes_10_asp_func;
        
        //Notas 10 aspetos funcionais
        for (var nST in mapNotas_10_asp_func){
            objNotas_10_asp_func[nST] = mapNotas_10_asp_func[nST];
        }
        objToExtract.notes_10_func_asp = objNotas_10_asp_func;

        //Recursos 10 aspetos funcionais

        /*
        for (var nST in mapRecursos_10_asp_func){
            objRecursos_10_asp_func[nST] = mapRecursos_10_asp_func[nST];
        }
        objToExtract.recursos_10_asp_func = objRecursos_10_asp_func;*/

        for(var nST in mapRecursos_10_asp_func){
            var objAux = {};
            for(var i in mapRecursos_10_asp_func[nST]){
                var objRecursoAux = {};
                objRecursoAux.url = mapRecursos_10_asp_func[nST][i].url;
                objRecursoAux.identifier = mapRecursos_10_asp_func[nST][i].identifier;
                
                objAux[i] = objRecursoAux;
            }
            objRecursos_10_asp_func[nST] = objAux;
        }
        objToExtract.resources_10_func_asp = objRecursos_10_asp_func;

        //Imagens 10 aspetos funcionais
        for(var nST in mapImagens_10_asp_func){
            var objAux = {};
            for(var i in mapImagens_10_asp_func[nST]){
                var objFotoAux = {};
                objFotoAux.photoName = mapImagens_10_asp_func[nST][i].photoName;
                objFotoAux.base64 = mapImagens_10_asp_func[nST][i].base64;
                objFotoAux.identifier = mapImagens_10_asp_func[nST][i].identifier;
                
                objAux[i] = objFotoAux;
            }
            objImagens_10_asp_func[nST] = objAux;
        }
        objToExtract.images_10_func_asp = objImagens_10_asp_func;


        /////////////////////////////////////////////////////////////////
        //Checkboxes Conteudo
        for (var nST in mapCheckboxes_conteudo){
            objCheckBoxes_conteudo[nST] = mapCheckboxes_conteudo[nST];
        }
        objToExtract.checkboxes_content = objCheckBoxes_conteudo;

        //Notas Conteudo
        for (var nST in mapNotas_conteudo){
            objNotas_conteudo[nST] = mapNotas_conteudo[nST];
        }
        objToExtract.notes_content = objNotas_conteudo;

        
        //Recursos Conteudo

        /*
        for (var nST in mapRecursos_conteudo){
            objRecursos_conteudo[nST] = mapRecursos_conteudo[nST];
        }
        objToExtract.recursos_conteudo = objRecursos_conteudo; */

        for(var nST in mapRecursos_conteudo){
            var objAux = {};
            for(var i in mapRecursos_conteudo[nST]){
                var objRecursoAux = {};
                objRecursoAux.url = mapRecursos_conteudo[nST][i].url;
                objRecursoAux.identifier = mapRecursos_conteudo[nST][i].identifier;
                
                objAux[i] = objRecursoAux;
            }
            objRecursos_conteudo[nST] = objAux;
        }
        objToExtract.resources_content = objRecursos_conteudo;


        //Imagens conteudo
        for(var nST in mapImagens_conteudo){
            var objAux = {};
            for(var i in mapImagens_conteudo[nST]){
                var objFotoAux = {};
                objFotoAux.photoName = mapImagens_conteudo[nST][i].photoName;
                objFotoAux.base64 = mapImagens_conteudo[nST][i].base64;
                objFotoAux.identifier = mapImagens_conteudo[nST][i].identifier;
                objAux[i] = objFotoAux;
            }
            objImagens_conteudo[nST] = objAux;
        }
        objToExtract.images_content = objImagens_conteudo;


        //////////////////////////////////////////////////////////////////
        //Checkboxes Transacao
        for (var nST in mapCheckboxes_transacao){
            objCheckBoxes_transacao[nST] = mapCheckboxes_transacao[nST];
        }
        objToExtract.checkboxes_transaction = objCheckBoxes_transacao;

        //Notas Transacao
        for (var nST in mapNotas_transacao){
            objNotas_transacao[nST] = mapNotas_transacao[nST];
        }
        objToExtract.notes_transaction = objNotas_transacao;

        //Recursos Transacao

        /*
        for (var nST in mapRecursos_transacao){
            objRecursos_transacao[nST] = mapRecursos_transacao[nST];
        }
        objToExtract.recursos_transacao = objRecursos_transacao;*/

        for(var nST in mapRecursos_transacao){
            var objAux = {};
            for(var i in mapRecursos_transacao[nST]){
                var objRecursoAux = {};
                objRecursoAux.url = mapRecursos_transacao[nST][i].url;
                objRecursoAux.identifier = mapRecursos_transacao[nST][i].identifier;
                
                objAux[i] = objRecursoAux;
            }
            objRecursos_transacao[nST] = objAux;
        }
        objToExtract.resources_transaction = objRecursos_transacao;


         //Imagens transacao
         for(var nST in mapImagens_transacao){
            var objAux = {};
            for(var i in mapImagens_transacao[nST]){
                var objFotoAux = {};
                objFotoAux.photoName = mapImagens_transacao[nST][i].photoName;
                objFotoAux.base64 = mapImagens_transacao[nST][i].base64;
                objFotoAux.identifier = mapImagens_transacao[nST][i].identifier;
                objAux[i] = objFotoAux;
            }
            objImagens_transacao[nST] = objAux;
        }
        objToExtract.images_transaction = objImagens_transacao;
        


        var dataJson = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(objToExtract));
        // what to return in order to show download window?
    
        //var botaoExtrairProgresso = document.getElementById('botaoExtrairProgresso');
        var aElem = document.createElement('a');
        aElem.setAttribute("href", "data:"+dataJson);
        aElem.setAttribute("download", "data.json"); 
        aElem.click();

}



/**
 * Funções Camada [2]  --  div checklist_selected
 */
function openSubtitle(obj){
    //var obj = JSON.parse(myJSON);
    var sub = mapSubtitulos.get(obj.subtitulo);
    var descricao = mapDescricao.get(obj.subtitulo);

    numSubtitulo = obj.subtitulo;
    subtitulo = sub;
    desc = descricao;

    //criar breadcrumb para o subtitulo/requisito
    var aTag = document.getElementById('anchor_requisito');
    var breadcrumb = document.getElementById("breadcrumb_requisito");
    aTag.innerText = "Requisito " + numSubtitulo;
    breadcrumb.style.display = "block";

    //preenche titulo
    var htmlTitulo = '<h1 id="h1_subtitulo_checklist" style="color:black; font-size: 18px; top: unset; position: unset;">'+ numSubtitulo+" "+subtitulo + '</h1>'
    document.getElementById("subtitulo").innerHTML = htmlTitulo;

    //preenche descricao
    var htmlDesc = '<p>'+ desc + '</p>';
    document.getElementById("descricao").innerHTML = htmlDesc;

    //preenche checkbox, notas, recursos e imagens de acordo com o valor da resposta nos maps de controlo
    var mapCheckboxes;
    var mapNotas;
    var mapRecursos;
    var mapImagens;

    if(checklistCarregada == "10_asp_func"){
        mapCheckboxes = mapCheckboxes_10_asp_func;
        mapNotas = mapNotas_10_asp_func;
        mapRecursos = mapRecursos_10_asp_func;
        mapImagens = mapImagens_10_asp_func;
        

    }else if(checklistCarregada == "conteudo"){
        mapCheckboxes = mapCheckboxes_conteudo;
        mapNotas = mapNotas_conteudo;
        mapRecursos = mapRecursos_conteudo;
        mapImagens = mapImagens_conteudo;

    }else if(checklistCarregada == "transacao"){
        mapCheckboxes = mapCheckboxes_transacao;
        mapNotas = mapNotas_transacao;
        mapRecursos = mapRecursos_transacao;
        mapImagens = mapImagens_transacao;
    }

    

    //limpar html checkboxes
    document.getElementById("check_sim").checked = false;
    document.getElementById("check_nao").checked = false;
    document.getElementById("check_na").checked = false;

    

    //atribuir checkbox selecionada
    if (typeof mapCheckboxes !== 'undefined' && mapCheckboxes !== null){

        var respostaCheck = mapCheckboxes[numSubtitulo];

        if(respostaCheck != null){
          if(respostaCheck == "S"){
            document.getElementById("check_sim").checked = true;
          }else if(respostaCheck == "N"){
            document.getElementById("check_nao").checked = true;
          }else if(respostaCheck == "NA"){
            document.getElementById("check_na").checked = true;
          }
        }       
    }

    //limpar notas
    document.getElementById("notasEvidencias_textArea").value = '';

    //preenche notas e evidências de acordo com o mapNotas
    if (typeof mapNotas !== 'undefined' && mapNotas !== null){
        if(mapNotas[numSubtitulo] === undefined){
            document.getElementById("notasEvidencias_textArea").value = '';
        }else{
            document.getElementById("notasEvidencias_textArea").value = mapNotas[numSubtitulo];
        }
        
    }

    //limpar recursos
    document.getElementById("recursosInternet_textArea").value = '';

    //preenche recursos de acordo com o mapRecursos
    /*
    if (typeof mapRecursos !== 'undefined' && mapRecursos !== null){
        if(mapRecursos[numSubtitulo] === undefined){
            document.getElementById("recursosInternet_textArea").value = '';
        }else{
            document.getElementById("recursosInternet_textArea").value = mapRecursos[numSubtitulo];
        }
        
    }*/
    
    //limpar lista de imagens
    document.getElementById('fileListChecklist').innerHTML="";
    document.getElementById('filesUploadedChecklist').value="";

    
    document.getElementById('tableRecursos').innerHTML="";
    //limpar listas que guardam imagens uploaded e lista de removidas
    listRemovedImages = [];
    listaUploadedImgObj = [];
    

    listaUploadedRecursosObj= [];
    listRemovedRecursos = [];

    


    //preenche recursos se jah existirem nos maprecursos
    var recursosList = document.getElementById('recursosList');
    if (typeof mapRecursos !== 'undefined' && mapRecursos !== null){
        //if(mapImagens[numSubtitulo] != null){
            var list = document.getElementById('tableRecursos');
            //$("#tableRecursos tr").remove(); 
            //table.id = "tableRecursos";
            for(var i in mapRecursos[numSubtitulo]){

                var idRec = mapRecursos[numSubtitulo][i].identifier;
                var url = mapRecursos[numSubtitulo][i].url;

                var li = document.createElement('li');
                li.id  = idRec; 




                //CODIGO TESTE
                var span_link = document.createElement('a');        

                span_link.innerHTML=url;
                span_link.id  = idRec;

                span_link.style.cursor = "pointer";
                span_link.href = url;
                span_link.target="blank"
                span_link.onmouseover = function() { $(this).css('text-decoration', 'underline'); };
                span_link.onmouseleave = function() { $(this).css('text-decoration', 'none'); };

                var span_remove = document.createElement('button');
                span_remove.style.marginLeft = "10px";
                span_remove.style.backgroundColor= "unset"
                span_remove.style.minWidth= "unset"
                span_remove.style.padding= "unset"
                span_remove.id  = idRec; 
                span_remove.classList.add('fa');
                span_remove.classList.add('fa-close');
                span_remove.onmouseover = function() { $(this).css('color', 'red'); };
                span_remove.onmouseleave = function() { $(this).css('color', 'black'); };
                span_remove.onclick = function() { deleteUrl(this); };
                //



    
                /*
                var span_link = document.createElement('span');
                span_link.innerHTML=url;
                span_link.id  = idRec;

                span_link.style.cursor = "pointer";
                span_link.onclick = function() { openUrl(this); };
                span_link.onmouseover = function() { $(this).css('text-decoration', 'underline'); };
                span_link.onmouseleave = function() { $(this).css('text-decoration', 'none'); };


                var span_remove = document.createElement('span');
                span_remove.style.cursor = "pointer";
                span_remove.style.marginLeft = "10px";
                span_remove.id  = idRec; 
                span_remove.classList.add('fa');
                span_remove.classList.add('fa-close');
                span_remove.onmouseover = function() { $(this).css('color', 'red'); };
                span_remove.onmouseleave = function() { $(this).css('color', 'black'); };
                span_remove.onclick = function() { deleteUrl(this); };
                */
                
                //li.appendChild(td_url);
                li.appendChild(span_link);
                li.appendChild(span_remove);
                list.appendChild(li);
                
            }
            //recursosList.appendChild(table);

        //}
    }

    //preenche imagens se jah existirem nos mapImagens
    var fileList = document.getElementById('fileListChecklist');
    if (typeof mapImagens !== 'undefined' && mapImagens !== null){
        if(mapImagens[numSubtitulo] != null){
            //var list = document.getElementById('tableImages');
            var list = document.createElement("ul");
            list.id = "tableImages";
            list.style.listStyle = "none";
            list.style["padding-left"] = "0px";
            //var table = document.getElementById('tableImages');
            //$("#tableImages tr").remove(); 
            for(i in mapImagens[numSubtitulo]){
               
                var idImg = mapImagens[numSubtitulo][i].identifier;

                var li = document.createElement('li');
                var span_link = document.createElement('span');
                //var td_image = document.createElement('td');
                
                li.id  = idImg; 

                span_link.innerHTML=mapImagens[numSubtitulo][i].photoName;
                span_link.id  = idImg;

                span_link.style.cursor = "pointer";
                span_link.onclick = function() { showImage(this); };
                span_link.onmouseover = function() { $(this).css('text-decoration', 'underline'); };
                span_link.onmouseleave = function() { $(this).css('text-decoration', 'none'); };

                var span_remove = document.createElement('span');
                span_remove.style.cursor = "pointer";
                span_remove.style.marginLeft = "10px";
                span_remove.id  = idImg; 
                span_remove.classList.add('fa');
                span_remove.classList.add('fa-close');
                span_remove.onmouseover = function() { $(this).css('color', 'red'); };
                span_remove.onmouseleave = function() { $(this).css('color', 'black'); };
                span_remove.onclick = function() { removeImage(this); };
                
                //tr.appendChild(td_image);
                li.appendChild(span_link);
                li.appendChild(span_remove);
                list.appendChild(li);
                
            }
            fileList.appendChild(list);

        }
    }

    
    divAtual = "3";
    document.getElementById("checklist_selected").style.display = "none"; //esconde camada 2
    document.getElementById("subtitle_selected").style.display = "block"; //mostra camada 3

    //esconde progresso e conformidade
    //document.getElementById("divProgressBar").style.display = "none";

}





function exportRelatorioHTML(){

    var tituloRel = "";
    var mapCheckboxes;
    var mapNotas;
    var mapRecursos;
    var mapImagens;
    var resProgressoConformidade;
    var checks = 0;

    if(checklistCarregada == "10_asp_func"){
        tituloRel = "10 Aspetos Funcionais";
        mapCheckboxes = mapCheckboxes_10_asp_func;
        mapNotas = mapNotas_10_asp_func;
        mapRecursos = mapRecursos_10_asp_func;
        mapImagens = mapImagens_10_asp_func;
        resProgressoConformidade = getProgressAndConformidadeAux(mapCheckboxes_10_asp_func, "10_asp_func");
        checks = "24";

    }else if(checklistCarregada == "conteudo"){
        tituloRel = "Conteudo";
        mapCheckboxes = mapCheckboxes_conteudo;
        mapNotas = mapNotas_conteudo;
        mapRecursos = mapRecursos_conteudo;
        mapImagens = mapImagens_conteudo;
        resProgressoConformidade = getProgressAndConformidadeAux(mapCheckboxes_conteudo, "conteudo");
        checks = "17";

    }else if(checklistCarregada == "transacao"){
        tituloRel = "Transação";
        mapCheckboxes = mapCheckboxes_transacao;
        mapNotas = mapNotas_transacao;
        mapRecursos = mapRecursos_transacao;
        mapImagens = mapImagens_transacao;
        resProgressoConformidade = getProgressAndConformidadeAux(mapCheckboxes_transacao, "transacao");
        checks = "13";
    }



    var defaultString = "Este campo ainda não foi preenchido";

    var htmlCode =  '<!DOCTYPE html><html><head><meta content="text/html;charset=utf-8" http-equiv="Content-Type"><meta content="utf-8" http-equiv="encoding">'
        htmlCode += '<title> Relatório ' + tituloRel + '</title></head>'+
                        '<body><h1>'+tituloRel+'</h1>';

                        
                        
                        
    
    //Progresso
    htmlCode += '<p id="progress">Progresso: ' + resProgressoConformidade.respondidas + "/" + checks + '</p>';
    //Conformidade
    htmlCode += '<p id="conformity">Conformidade: ' + resProgressoConformidade.numeroSim + "/" + resProgressoConformidade.totalChecks + '</p>';
    //Designacao website
    var dw = designacaoSitioWeb || defaultString;
    htmlCode += '<p id="websiteDesignation">Designação do Sítio Web: ' + dw + '</p>';
    //Endereço do sítio Web:
    var endWS = enderecoSitioWeb || defaultString;
    htmlCode += '<p id="websiteAddress">Endereço do sítio Web: ' + endWS + '</p>';
    //Entidade
    var ent = entidade || defaultString;
    htmlCode += '<p id="entity">Entidade: ' + ent + '</p>';
    //Data
    var dia = data || defaultString;
    htmlCode += '<p id="date">Data: ' + dia + '</p>';


    for(var t of mapTitulos){
        htmlCode += '<details>';
        htmlCode += '<summary><h2>'+ t[0] + ' ' +t[1]+'</h2></summary>';
        for(var st of mapSubtitulos){
            
            var numST = st[0].split(".");
            if( numST[0] === t[0] ){
                htmlCode += '<details>';
                htmlCode += '<summary><h3>'+ st[0] + ' ' +st[1]+'</h3></summary>';

                /*
                //Descrições
                for(var d of mapDescricao){
                    //var numDesc = d[0].split(".");
                    if( d[0] === st[0] ){
                        htmlCode += '<p>'+ d[1] +'<p>';
                    }
                } */

                var numSubT = st[0];
                //checkbox -> conformidade
                var checkConf = checkCorrespondente[mapCheckboxes[numSubT]] || checkCorrespondente['NR']; 
                htmlCode += '<p id="checkbox_'+checklistCarregada+'_'+numSubT+'">Conformidade: ' + checkConf+'</p>';


                //Listagem de evidências
                var listEvidencias = mapNotas[numSubT] || defaultString;
                htmlCode += '<p id="note_'+checklistCarregada+'_'+numSubT+'">Listagem de Evidências e Notas: ' + listEvidencias+'</p>';

                //Recursos de Internet
                

                if(!Array.isArray(mapRecursos[numSubT])){
                    htmlCode += '<p id="resource_'+checklistCarregada+'_'+numSubT+'">Recursos da Internet: ' + defaultString + '</p>';
                }else if(mapRecursos[numSubT].length == 0){
                    htmlCode += '<p id="resource_'+checklistCarregada+'_'+numSubT+'">Recursos da Internet: ' + defaultString + '</p>';
                }else{
                    htmlCode += '<p id="resource_'+checklistCarregada+'_'+numSubT+'">Recursos da Internet: </p>';
                    htmlCode += '<ul>';
                    for(var iRec in mapRecursos[numSubT]){
                    
                        htmlCode += '<li> <a href="' + mapRecursos[numSubT][iRec].url +'">'+ mapRecursos[numSubT][iRec].url +'</a></li>'
                    }
                    htmlCode += '</ul>'
                }



                //Imagens
                if(!Array.isArray(mapImagens[numSubT])){
                    htmlCode += '<p id="image_'+checklistCarregada+'_'+numSubT+'">Imagens Uploaded: ' + defaultString + '</p>';
                }else if(mapImagens[numSubT].length == 0){
                    htmlCode += '<p id="image_'+checklistCarregada+'_'+numSubT+'">Imagens Uploaded: ' + defaultString + '</p>';
                }else{
                    htmlCode += '<p id="image_'+checklistCarregada+'_'+numSubT+'">Imagens Uploaded: </p>';
                    for(var iImg in mapImagens[numSubT]){   
                        htmlCode += '<img src="' + mapImagens[numSubT][iImg].base64 + '" alt="' + mapImagens[numSubT][iImg].photoName + '">' 

                    }
                }


                //
                htmlCode += '</details>';
            }

            
        }
        htmlCode += '</details>';
        htmlCode += '<br><br><br>';
    }
    htmlCode+='</body></html>';


    var dataHTML = "text/html;charset=utf-8," + encodeURIComponent(htmlCode);
        // what to return in order to show download window?
    
    var botaoExportRelatorioHTML = document.getElementById('botaoExportRelatorioHTML');
    botaoExportRelatorioHTML.setAttribute("href", "data:"+dataHTML);
    botaoExportRelatorioHTML.setAttribute("download", "relatorio.html");    

}


function expandirLegenda (){
    if(document.getElementById("expandir_legenda").classList.contains("fa-plus")){
        document.getElementById("legenda_div").style.display = "block";
        document.getElementById("expandir_legenda").classList.remove("fa-plus");
        document.getElementById("expandir_legenda").classList.add("fa-minus");
        document.getElementById("legenda_anchor").setAttribute('aria-label', "Comprimir legenda");
    }else{
        document.getElementById("legenda_div").style.display = "none";
        document.getElementById("expandir_legenda").classList.remove("fa-minus");
        document.getElementById("expandir_legenda").classList.add("fa-plus");
        document.getElementById("legenda_anchor").setAttribute('aria-label', "Expandir legenda");
    }
}






/**
 * Funções Camada [3]  --  div subtitle_selected
 */

//checkboxes sim/nao/nr
// the selector will match all input controls of type :checkbox
// and attach a click event handler 
$("input:radio").on('click', function() {
    // in the handler, 'this' refers to the box clicked on
    var $box = $(this);
    if ($box.is(":checked")) {
      // the name of the box is retrieved using the .attr() method
      // as it is assumed and expected to be immutable
      var group = "input:radio[name='" + $box.attr("name") + "']";
      // the checked state of the group/box on the other hand will change
      // and the current value is retrieved using .prop() method
      $(group).prop("checked", false);
      $box.prop("checked", true);
    } else {
      $box.prop("checked", false);
    }
  });

function okFunction(){
    //obtem a checkbox preenchida
    var isScheck = document.getElementById("check_sim").checked;
    var isNcheck = document.getElementById("check_nao").checked;
    var isNAcheck = document.getElementById("check_na").checked;

    var checkSelected = "NR"; //comeca com 'NAO RESPONDIDO'
    //verificar qual das checkboxes estah selecionada
    if(isScheck){
      checkSelected = "S";
    }else if(isNcheck){
      checkSelected = "N";
    }else if (isNAcheck){
      checkSelected = "NA";
    }

    //obtem notas e evidencias
    var notas = document.getElementById("notasEvidencias_textArea").value;

    //obtem recursos
    //var recursos = document.getElementById("recursosInternet_textArea").value;

    //obtem imagens escolhidas



     /*
    if(checklistCarregada == "10_asp_func"){
        mapImagens_10_asp_func[numSubtitulo][idImage] = null;

    }else if(checklistCarregada == "conteudo"){
       mapImagens_conteudo[numSubtitulo][idImage] = null;

    }else if(checklistCarregada == "transacao"){
       mapImagens_transacao[numSubtitulo][idImage] = null;

    }*/


    if(checklistCarregada == "10_asp_func"){
        mapCheckboxes_10_asp_func[numSubtitulo] = checkSelected;
        mapNotas_10_asp_func[numSubtitulo] = notas;
        //mapRecursos_10_asp_func[numSubtitulo] = recursos;

        //mostra progresso e conformidade
        getProgressAndConformidadeBar(mapCheckboxes_10_asp_func, "10_asp_func", "24");

        //reorganiza os ids das imagens no mapImagens
        var imgOrg = organizarMapImagens(mapImagens_10_asp_func); 
        mapImagens_10_asp_func[numSubtitulo]=imgOrg;

        //reorganiza os ids dos recursos no mapRecursos
        var recOrg = organizarMapRecursos(mapRecursos_10_asp_func);
        mapRecursos_10_asp_func[numSubtitulo] = recOrg;
        

    }else if(checklistCarregada == "conteudo"){
        mapCheckboxes_conteudo[numSubtitulo] = checkSelected;
        mapNotas_conteudo[numSubtitulo] = notas;
        //mapRecursos_conteudo[numSubtitulo] = recursos;

        //mostra progresso e conformidade
        getProgressAndConformidadeBar(mapCheckboxes_conteudo, "conteudo", "17");

        //reorganiza os ids das imagens no mapImagens
        var imgOrg = organizarMapImagens(mapImagens_conteudo);
        mapImagens_conteudo[numSubtitulo]=imgOrg;

        //reorganiza os ids dos recursos no mapRecursos
        var recOrg = organizarMapRecursos(mapRecursos_conteudo);
        mapRecursos_conteudo[numSubtitulo] = recOrg;

    }else if(checklistCarregada == "transacao"){
        mapCheckboxes_transacao[numSubtitulo] = checkSelected;
        mapNotas_transacao[numSubtitulo] = notas;
        //mapRecursos_transacao[numSubtitulo] = recursos;

        //mostra progresso e conformidade
        getProgressAndConformidadeBar(mapCheckboxes_transacao, "transacao", "13");

         //reorganiza os ids das imagens no mapImagens
         var imgOrg = organizarMapImagens(mapImagens_transacao);
         mapImagens_transacao[numSubtitulo]=imgOrg;

         //reorganiza os ids dos recursos no mapRecursos
        var recOrg = organizarMapRecursos(mapRecursos_transacao);
        mapRecursos_transacao[numSubtitulo] = recOrg;

    }
    

    divAtual = "2";
    preencherListas();
    getProgressoConformidadeChecklistSelected(checklistCarregada);
    document.getElementById("subtitle_selected").style.display = "none"; //esconde camada 3
    document.getElementById("checklist_selected").style.display = "block"; //mostra camada 2

    //esconde ultimo breadcrumb
    document.getElementById("breadcrumb_requisito").style.display="none";

    listRemovedImages = []; 
    listaUploadedImgObj = [];

    listaUploadedRecursosObj = [];
    listRemovedRecursos = [];

}



  var listaUploadedRecursosObj = [];

  function addRecursoInternet(){
    var resourceInput = document.getElementById("recursosInternet_textArea");
    var url = resourceInput.value;
    var validUrl = validURL(resourceInput.value);

      if(validUrl){
        resourceInput.style["border"] = "";

        var obj = {
            url: url,
            identifier: _lastGenIdRecursos
            };

        listaUploadedRecursosObj.push(obj);

        //criar a tabela de recursos depois de upload
        var table = document.getElementById('tableRecursos');
        var li = document.createElement('li');

        li.id  = _lastGenIdRecursos; 


        //CODIGO TESTE
        var span_link = document.createElement('a');        

        span_link.innerHTML=url;
        span_link.id  = _lastGenIdRecursos;

        span_link.style.cursor = "pointer";
        span_link.href = url;
        span_link.target="blank"
        span_link.onmouseover = function() { $(this).css('text-decoration', 'underline'); };
        span_link.onmouseleave = function() { $(this).css('text-decoration', 'none'); };

        var span_remove = document.createElement('button');
        span_remove.style.marginLeft = "10px";
        span_remove.style.backgroundColor= "unset"
        span_remove.style.minWidth= "unset"
        span_remove.style.padding= "unset"
        span_remove.id  = _lastGenIdRecursos; 
        span_remove.classList.add('fa');
        span_remove.classList.add('fa-close');
        span_remove.onmouseover = function() { $(this).css('color', 'red'); };
        span_remove.onmouseleave = function() { $(this).css('color', 'black'); };
        span_remove.onclick = function() { deleteUrl(this); };
        //



        /*
        var spanLink = document.createElement('span');
        //var td_url = document.createElement('td');          

        spanLink.innerHTML=url;
        spanLink.id  = _lastGenIdRecursos;

        spanLink.style.cursor = "pointer";
        spanLink.onclick = function() { openUrl(this); };
        spanLink.onmouseover = function() { $(this).css('text-decoration', 'underline'); };
        spanLink.onmouseleave = function() { $(this).css('text-decoration', 'none'); };

        var span_remove = document.createElement('span');
        span_remove.style.cursor = "pointer";
        span_remove.style.marginLeft = "10px";
        span_remove.id  = _lastGenIdRecursos; 
        span_remove.classList.add('fa');
        span_remove.classList.add('fa-close');
        span_remove.onmouseover = function() { $(this).css('color', 'red'); };
        span_remove.onmouseleave = function() { $(this).css('color', 'black'); };
        span_remove.onclick = function() { deleteUrl(this); };
        */


        //li.appendChild(td_url);
        li.appendChild(span_link);
        li.appendChild(span_remove);
        table.appendChild(li);

        _lastGenIdRecursos++;
        document.getElementById("recursosInternet_textArea").value = '';

      }else{
        

      }
  }

  function openUrl(url){
    openInNewTabWinBrowser(url.textContent);
  }
  
  var listRemovedRecursos = [];
  function deleteUrl(td){
    var childs = $(document.getElementById("tableRecursos")).children();

    for(var i=0; i<childs.length; i++ ) {
        if(childs[i].id == td.id){
            document.getElementById('tableRecursos').removeChild(childs[i]);
            break;
        }
    }

    listRemovedRecursos.push(td.id); 

  }


  function checkIfIsLink(ta){
      var teste = validURL(ta.textContent);

      if(teste){
        var str = ta.textContent;
        var result = str.link(ta.textContent);
        document.getElementById("recursosInternet_textArea").innerHTML = '';
        document.getElementById("recursosInternet_textArea").innerHTML = result;
      }

  }

  function validURL(str) {
    var resourceInput = document.getElementById("recursosInternet_textArea");
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      
      
      if(!!pattern.test(str)){
        resourceInput.style["border"] = "2px solid #90ee90";
      }else{
        resourceInput.style["border"] = "2px solid #ff0000";
      }
    return !!pattern.test(str);
  }

  function openInNewTabWinBrowser(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

  //ler ficheiros selecionados e chama o getBase64(file)

function updateList(){
    var x = document.getElementById('filesUploadedChecklist');
    var output = document.getElementById('fileListChecklist');
    var table = document.getElementById('tableImages');

    if(table == null){
        table = document.createElement('ul');
        table.id = 'tableImages';
    }
    
    if ('files' in x) {
      if (x.files.length !== 0) {
        for (var i = 0; i < x.files.length; ++i) {
            getBase64(x.files[i]);
        
        }
      }
    } 
    output.appendChild(table);
}



function showImage(td){

    var modal = document.getElementById("myModal");

    var img = document.createElement("IMG");
    
    //img.src = mapImagens_10_asp_func[numSubtitulo][td.id].base64;

    var mapImagens;

    if(checklistCarregada == "10_asp_func"){
        mapImagens = mapImagens_10_asp_func;
        

    }else if(checklistCarregada == "conteudo"){
        mapImagens = mapImagens_conteudo;

    }else if(checklistCarregada == "transacao"){
        mapImagens = mapImagens_transacao;
    }

    

    if(mapImagens[numSubtitulo] == undefined){
        for(var i in listaUploadedImgObj){
            if(listaUploadedImgObj[i].identifier == td.id){
                


                img.setAttribute('src', listaUploadedImgObj[i].base64);

                var modalImg = document.getElementById("img01");
                var captionText = document.getElementById("caption");

                modal.style.display = "block";
                modalImg.src = img.src;
                captionText.innerHTML = img.alt;
                
                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];

                // When the user clicks on <span> (x), close the modal
                span.onclick = function() { 
                    modal.style.display = "none";
                }



            }
        }
    }else{
        var foundImgToShow = false;

        for(var i in listaUploadedImgObj){
            if(listaUploadedImgObj[i].identifier == td.id){
                foundImgToShow = true;
                img.setAttribute('src', listaUploadedImgObj[i].base64);

                var modalImg = document.getElementById("img01");
                var captionText = document.getElementById("caption");

                modal.style.display = "block";
                modalImg.src = img.src;
                captionText.innerHTML = img.alt;
                
                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];

                // When the user clicks on <span> (x), close the modal
                span.onclick = function() { 
                    modal.style.display = "none";
                }
                break;
            }
        }

        if(!foundImgToShow){
            for(var i in mapImagens[numSubtitulo]){
                if(mapImagens[numSubtitulo][i].identifier == td.id){
                    foundImgToShow = true;
                    img.setAttribute('src', mapImagens[numSubtitulo][i].base64);

                    var modalImg = document.getElementById("img01");
                    var captionText = document.getElementById("caption");

                    modal.style.display = "block";
                    modalImg.src = img.src;
                    captionText.innerHTML = img.alt;
                    
                    // Get the <span> element that closes the modal
                    var span = document.getElementsByClassName("close")[0];

                    // When the user clicks on <span> (x), close the modal
                    span.onclick = function() { 
                        modal.style.display = "none";
                    }
                    break;
                }
            }
        }
    }
    
}

var listRemovedImages = [];
function removeImage(td){
    var childs = $(document.getElementById("tableImages")).children();

    for(var i=0; i<childs.length; i++ ) {
        if(childs[i].id == td.id){
            document.getElementById('tableImages').removeChild(childs[i]);
            break;
        }
    }

    listRemovedImages.push(td.id); 

}

// concatena o array principal de imagens com o array de imagens uploaded
// depois de construido o novo array, filtrar as que estão na lista de remover e retirá-las
function organizarMapImagens(mapImagens){ 

    var imgAdded = [];

    //if(mapImagens[numSubtitulo] == undefined || mapImagens[numSubtitulo] == null || mapImagens[numSubtitulo] == {}){
    if(!Array.isArray(mapImagens[numSubtitulo])){
        imgAdded = listaUploadedImgObj;
    }else{
        imgAdded = mapImagens[numSubtitulo].concat(listaUploadedImgObj);
    }

   //colocar a null todas as imagens que foram apagadas
    var aux = imgAdded.slice();
    for(var  i in imgAdded){
        for(var j in listRemovedImages){
            if (imgAdded[i].identifier == listRemovedImages[j]){
                aux[i] = null;
            }
        }
    }

    //colocar no array res todas as imagens que não estão a null (ou seja, que nao foram apagadas)
    var res = [];
    for(var  i in aux){
        if(aux[i] != null){
            res.push(aux[i]);
        }
    }

    return res;

}


function organizarMapRecursos(mapRecursos){

    var recursosAdded = [];

    if(!Array.isArray(mapRecursos[numSubtitulo])){
        recursosAdded = listaUploadedRecursosObj;
    }else{
        recursosAdded = mapRecursos[numSubtitulo].concat(listaUploadedRecursosObj);
    }

   //colocar a null todas os recursos que foram apagados
    var aux = recursosAdded.slice();
    for(var  i in recursosAdded){
        for(var j in listRemovedRecursos){
            if (recursosAdded[i].identifier == listRemovedRecursos[j]){
                aux[i] = null;
            }
        }
    }

    //colocar no array res todas os recursos que não estão a null (ou seja, que nao foram apagados)
    var res = [];
    for(var  i in aux){
        if(aux[i] != null){
            res.push(aux[i]);
        }
    }

    return res;

}


  
var listaUploadedImgObj = [];
//converter para base64 e guarda-las no array de imagens

function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file); //converter
    reader.onload = function (e) {
      //arrayImagensB64.push(reader.result); //faz push para o array
      //var image = new Image();
      var image = document.createElement("img");

      image.src = e.target.result;

        image.onload = function() {
            var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');

            // set its dimension to target size
            canvas.width = 960;
            canvas.height = 540;

            if(image.width > 960 || image.height > 540){
                
                if(image.width >  image.height ){ //comprimento maior que altura
                    var ratio = image.height / image.width;
                    canvas.width = 960;
                    canvas.height = canvas.width * ratio;
                }
                else if(image.height  > image.width ){ //altura maior que comprimento
                    var ratio = image.width / image.height;
                    canvas.height = 540;
                    canvas.width = canvas.height * ratio;
                }
            }



            // draw source image into the off-screen canvas:
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);


            var newBase64 = canvas.toDataURL('image/jpeg', 0.5);

            var obj = {
            photoName: file.name,
            base64: newBase64,
            identifier: _lastGenIdImg
            };

            listaUploadedImgObj.push(obj);


            //criar a tabela de imagens depois de upload
            var list = document.getElementById('tableImages');
            list.style.listStyleType = "none";
            list.style.padding = "0";

            var li = document.createElement('li');
            var span_link = document.createElement('span');
            //var td_image = document.createElement('td');          
            
            li.id  = _lastGenIdImg; 

            span_link.innerHTML=obj.photoName;
            span_link.style.cursor = "pointer";
            span_link.id  = _lastGenIdImg;
            span_link.onclick = function() { showImage(this); };
            span_link.onmouseover = function() { $(this).css('text-decoration', 'underline'); };
            span_link.onmouseleave = function() { $(this).css('text-decoration', 'none'); };

            var span_remove = document.createElement('span');
            span_remove.style.cursor = "pointer";
            span_remove.style.marginLeft = "10px";
            span_remove.id  = _lastGenIdImg; 
            span_remove.classList.add('fa');
            span_remove.classList.add('fa-close');
            span_remove.onmouseover = function() { $(this).css('color', 'red'); };
            span_remove.onmouseleave = function() { $(this).css('color', 'black'); };
            span_remove.onclick = function() { removeImage(this); };
            
            //tr.appendChild(td_image);
            li.appendChild(span_link);
            li.appendChild(span_remove);
            list.appendChild(li);

            _lastGenIdImg++;


        };


    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
}


function imageToDataUri(img, width, height) {

    img.onload = function (){

    }
    // create an off-screen canvas
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    // set its dimension to target size
    canvas.width = width;
    canvas.height = height;

    // draw source image into the off-screen canvas:
    ctx.drawImage(img, 0, 0, width, height);

    // encode image to data-uri with base64 version of compressed image
    return canvas.toDataURL();
}



window.onload = pageLoad();
