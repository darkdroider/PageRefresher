// ==UserScript==
// @name         PageRefresher
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Atualiza as páginas conforme as regras especificadas, somente uma vez
// @author       darkdroider
// @match        *://*.givee.club/*/event/*
// @match        *://*.alienwarearena.com/control-center*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/darkdroider/PageRefresher/main/PageRefresher.user.js
// @downloadURL  https://raw.githubusercontent.com/darkdroider/PageRefresher/main/PageRefresher.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Função para verificar se a página está completamente carregada
    function aguardarCarregamentoPagina(callback) {
        if (document.readyState === "complete") {
            callback();
        } else {
            window.addEventListener('load', callback);
        }
    }

    // Função para atualizar a página após um tempo específico
    function atualizarPagina(tempoAtualizacao, chaveStorage) {
        if (!sessionStorage.getItem(chaveStorage)) {
            setTimeout(() => {
                sessionStorage.setItem(chaveStorage, 'true');
                location.reload();
            }, tempoAtualizacao);
        }
    }

    // Verifica a URL atual e aplica as regras de atualização apropriadas
    const urlAtual = window.location.href;

    if (urlAtual.includes("givee.club") && urlAtual.includes("/event/")) {
        aguardarCarregamentoPagina(() => atualizarPagina(6000, 'atualizouGiveeClub'));
    } else if (urlAtual.includes("alienwarearena.com/control-center")) {
        aguardarCarregamentoPagina(() => atualizarPagina(3000, 'atualizouAlienwareArena'));
    }
})();
