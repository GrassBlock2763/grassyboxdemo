//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!0;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||qe(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g;function p(e){g=e}function h(e){if(Ne.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function w(e,...t){console.info(d+e,...t)}function b(e,...t){console.info(e,...t)}function y(e,...t){console.warn(d+e,...t)}function v(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}let _,E,T="",x=(new Date).valueOf();function j(t,o,n){return function(...r){try{let i=r[0];if(void 0===i)i="undefined";else if(null===i)i="null";else if("function"==typeof i)i=i.toString();else if("string"!=typeof i)try{i=JSON.stringify(i)}catch(e){i=i.toString()}if("string"==typeof i&&e){if(Pe&&-1!==i.indexOf("keeping the worker alive for asynchronous operation"))return;if(0===i.indexOf("MONO_WASM: ")||0===i.indexOf("[MONO]")){const e=new Date;x!==e.valueOf()&&(T=e.toISOString().substring(11,23),x=e.valueOf()),i=`[${g} ${T}] ${i}`}}o(n?JSON.stringify({method:t,payload:i,arguments:r.slice(1)}):[t+i,...r.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function R(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",O),u.addEventListener("close",D),function(){for(const e of c)f[e]=j(`console.${e}`,A,!0)}()}function S(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&b(e),function(){for(const e of c)f[e]=j(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",O),u.removeEventListener("close",D),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function A(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function O(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function D(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function k(){Ne.preferredIcuAsset=I(Ne.config);let e="invariant"==Ne.config.globalizationMode;if(!e)if(Ne.preferredIcuAsset)Ne.diagnosticTracing&&h("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Ne.config.globalizationMode||"all"===Ne.config.globalizationMode||"sharded"===Ne.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw v(`ERROR: ${e}`),new Error(e)}Ne.diagnosticTracing&&h("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Ne.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Ne.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){w("failed to detect timezone, will fallback to UTC")}}function I(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(Ce?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}const P=class{constructor(e){this.url=e}toString(){return this.url}};async function C(e,t){try{const o="function"==typeof globalThis.fetch;if(De){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});_||(E=ze.require("url"),_=ze.require("fs")),n&&(e=E.fileURLToPath(e));const r=await _.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function M(e){return"string"!=typeof e&&qe(!1,"url must be a string"),!L(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,N=/[a-zA-Z]:[\\/]/;function L(e){return De||Me?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||N.test(e):U.test(e)}let $,z=0;const W=[],F=[],B=new Map,V={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},q={...V,"js-module-library-initializer":!0},J={...V,dotnetwasm:!0,heap:!0,manifest:!0},H={...q,manifest:!0},Z={...q,dotnetwasm:!0},Q={dotnetwasm:!0,symbols:!0},G={...q,dotnetwasm:!0,symbols:!0},K={symbols:!0};function X(e){return!("icu"==e.behavior&&e.name!=Ne.preferredIcuAsset)}function Y(e,t,o){null!=t||(t=[]),qe(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,ee(n),e.push(n),n}function ee(e){J[e.behavior]&&B.set(e.behavior,e)}function te(e){qe(J[e],`Unknown single asset behavior ${e}`);const t=B.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Ne.locateFile(t.name),V[t.behavior]){const e=he(t);e?("string"!=typeof e&&qe(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ue(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function oe(e){const t=te(e);return qe(t,`Single asset for ${e} not found`),t}let ne=!1;async function re(){if(!ne){ne=!0,Ne.diagnosticTracing&&h("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!G[e.behavior]&&X(e)&&Ne.expected_instantiated_assets_count++,!Z[e.behavior]&&X(e)&&(Ne.expected_downloaded_assets_count++,t.push(le(e)))};for(const t of W)o(t,e);for(const e of F)o(e,t);Ne.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Ne.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Ne.err("Error in mono_download_assets: "+e),et(1,e),e})),await Ne.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!G[t.behavior]){t.buffer&&"object"==typeof t.buffer||qe(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&qe(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);we(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else Q[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),we(t)),Q[t.behavior]&&++Ne.actual_downloaded_assets_count):(t.isOptional||qe(!1,"Expected asset to have the downloaded buffer"),!Z[t.behavior]&&X(t)&&Ne.expected_downloaded_assets_count--,!G[t.behavior]&&X(t)&&Ne.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Pe||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Ne.err("Error in mono_download_assets: "+e),et(1,e),e})),Promise.all(i).then((async()=>{Pe||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Ne.err("Error in mono_download_assets: "+e),et(1,e),e}))}catch(e){throw Ne.err("Error in mono_download_assets: "+e),e}}}let ie=!1;function se(){if(ie)return;ie=!0;const e=Ne.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&qe(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&qe(!1,"asset behavior must be known string"),"string"!=typeof t.name&&qe(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&qe(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&qe(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&qe(!1,"asset pendingDownload could be object"),t.isCore?W.push(t):F.push(t),ee(t);else if(e.resources){const o=e.resources;o.wasmNative||qe(!1,"resources.wasmNative must be defined"),o.jsModuleNative||qe(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||qe(!1,"resources.jsModuleRuntime must be defined"),o.jsModuleWorker||qe(!1,"resources.jsModuleWorker must be defined"),Y(F,o.wasmNative,"dotnetwasm"),Y(t,o.jsModuleNative,"js-module-native"),Y(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&Y(t,o.jsModuleDiagnostics,"js-module-diagnostics"),Y(t,o.jsModuleWorker,"js-module-threads");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,W.push(n)):F.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Ne.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=I(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=be(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||F.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...W,...F,...t]}async function ae(e){const t=await le(e);return await t.pendingDownloadInternal.response,t.buffer}async function le(e){try{return await ce(e)}catch(t){if(!Ne.enableDownloadRetry)throw t;if(Me||De)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Ne.allDownloadsQueued.promise;try{return Ne.diagnosticTracing&&h(`Retrying download '${e.name}'`),await ce(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Ne.diagnosticTracing&&h(`Retrying download (2) '${e.name}' after delay`),await ce(e)}}}async function ce(e){for(;$;)await $.promise;try{++z,z==Ne.maxParallelDownloads&&(Ne.diagnosticTracing&&h("Throttling further parallel downloads"),$=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Ne.config.remoteSources?Ne.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=de(e,n);e.name===t?Ne.diagnosticTracing&&h(`Attempting to download '${t}'`):Ne.diagnosticTracing&&h(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=ge(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Ne.config.ignorePdbLoadErrors;if(o||qe(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}w(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(Q[e.behavior]||(e.buffer=await t.arrayBuffer(),++Ne.actual_downloaded_assets_count),e):e}finally{if(--z,$&&z==Ne.maxParallelDownloads-1){Ne.diagnosticTracing&&h("Resuming more parallel downloads");const e=$;$=void 0,e.promise_control.resolve()}}}function de(e,t){let o;return null==t&&qe(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ue(Ne.locateFile(o),e.behavior)),o&&"string"==typeof o||qe(!1,"attemptUrl need to be path or url string"),o}function ue(e,t){return Ne.modulesUniqueQuery&&H[t]&&(e+=Ne.modulesUniqueQuery),e}let fe=0;const me=new Set;function ge(e){try{e.resolvedUrl||qe(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Ne.loadBootResource){const o=he(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Ne.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Ne.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Ne.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return me.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Ne.loadedAssemblies.push(e.name),fe++,Ne.onDownloadResourceProgress&&Ne.onDownloadResourceProgress(fe,me.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const pe={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function he(e){var t;if(Ne.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=pe[e.behavior];if(r){const t=Ne.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?M(t):t}}}function we(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function be(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function ye(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ue(Ne.locateFile(t),"js-module-library-initializer");Ne.diagnosticTracing&&h(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Ne.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){y(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function ve(e,t){if(!Ne.libraryInitializers)return;const o=[];for(let n=0;n<Ne.libraryInitializers.length;n++){const r=Ne.libraryInitializers[n];r.exports[e]&&o.push(_e(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function _e(e,t,o){try{await o()}catch(o){throw y(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),et(1,o),o}}function Ee(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=xe(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Te(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=Ee(e.config,o.config)),Object.assign(e,o)}function xe(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function je(){const e=Ne.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Ne.diagnosticTracing&&h("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}xe(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),Number.isInteger(e.pthreadPoolInitialSize)||(e.pthreadPoolInitialSize=5),Number.isInteger(e.pthreadPoolUnusedSize)||(e.pthreadPoolUnusedSize=1),null==e.jsThreadBlockingMode&&(e.jsThreadBlockingMode="PreventSynchronousJSExport"),void 0===e.environmentVariables.MONO_SLEEP_ABORT_LIMIT&&(e.environmentVariables.MONO_SLEEP_ABORT_LIMIT="5000"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Ne.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Ne.maxParallelDownloads=e.maxParallelDownloads||Ne.maxParallelDownloads,Ne.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Ne.enableDownloadRetry}let Re=!1;async function Se(e){var t;if(Re)return void await Ne.afterConfigLoaded.promise;let o;try{if(e.configSrc||Ne.config&&0!==Object.keys(Ne.config).length&&(Ne.config.assets||Ne.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,Re=!0,o&&(Ne.diagnosticTracing&&h("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Ne.locateFile(t);let n=null;void 0!==Ne.loadBootResource&&(n=Ne.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(M(n)),r=await Oe(i)):r=(await import(M(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Oe(i)):r=e.config}else o.includes(".json")?(i=await s(ue(o,"manifest")),r=await Oe(i)):r=(await import(ue(o,"manifest"))).config;function s(e){return Ne.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Ne.config.applicationEnvironment&&(r.applicationEnvironment=Ne.config.applicationEnvironment),Ee(Ne.config,r)}(e)),je(),await ye(null===(t=Ne.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await ve("onRuntimeConfigLoaded",[Ne.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Ne.config,$e),je()}catch(e){throw v("onConfigLoaded() failed",e),e}je(),Ne.afterConfigLoaded.promise_control.resolve(Ne.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Ne.config=e.config=Object.assign(Ne.config,{message:n,error:t,isError:!0}),et(1,new Error(n)),t}}function Ae(){return!!globalThis.navigator&&(Ne.isChromium||Ne.isFirefox)}async function Oe(e){const t=Ne.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const De="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,ke="function"==typeof importScripts,Ie=ke&&"undefined"!=typeof dotnetSidecar,Pe=ke&&!Ie,Ce="object"==typeof window||ke&&!De,Me=!Ce&&!De;let Ue={},Ne={},Le={},$e={},ze={},We=!1;const Fe={},Be={config:Fe},Ve={mono:{},binding:{},internal:ze,module:Be,loaderHelpers:Ne,runtimeHelpers:Ue,diagnosticHelpers:Le,api:$e};function qe(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);v(o,n),Ue.nativeAbort(n)}function Je(){return void 0!==Ne.exitCode}function He(){return Ue.runtimeReady&&!Je()}function Ze(){Je()&&qe(!1,`.NET runtime already exited with ${Ne.exitCode} ${Ne.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Pe?Ue.runtimeReady||qe(!1,"The WebWorker is not attached to the runtime. See https://github.com/dotnet/runtime/blob/main/src/mono/wasm/threads.md#JS-interop-on-dedicated-threads"):Ue.runtimeReady||qe(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Qe(){Ce&&(globalThis.addEventListener("unhandledrejection",ot),globalThis.addEventListener("error",nt))}let Ge,Ke;function Xe(e){Ke&&Ke(e),et(e,Ne.exitReason)}function Ye(e){var t;if(Ge&&Ge(e||Ne.exitReason),(null===(t=Ne.config)||void 0===t?void 0:t.dumpThreadsOnNonZeroExit)&&Ue.mono_wasm_print_thread_dump&&void 0===Ne.exitCode)try{Ue.mono_wasm_print_thread_dump()}catch(e){}et(1,e||Ne.exitReason)}function et(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Je())Ne.diagnosticTracing&&h("mono_exit called after exit");else{try{Be.onAbort==Ye&&(Be.onAbort=Ge),Be.onExit==Xe&&(Be.onExit=Ke),Ce&&(globalThis.removeEventListener("unhandledrejection",ot),globalThis.removeEventListener("error",nt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Ne.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Ne.config)||void 0===r?void 0:r.dumpThreadsOnNonZeroExit)&&Ue.dumpThreads()):(Ne.diagnosticTracing&&h(`abort_startup, reason: ${o}`),function(e){Ne.allDownloadsQueued.promise_control.reject(e),Ne.allDownloadsFinished.promise_control.reject(e),Ne.afterConfigLoaded.promise_control.reject(e),Ne.wasmCompilePromise.promise_control.reject(e),Ne.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){y("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?h:v;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Pe&&Ne.config&&(Ne.config.logExitCode?Ne.config.forwardConsoleLogsToWS?S("WASM EXIT "+e):b("WASM EXIT "+e):Ne.config.forwardConsoleLogsToWS&&S())}(t,o),function(e){if(Ce&&!Pe&&Ne.config&&Ne.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){y("mono_exit B failed",e)}Ne.exitCode=t,Ne.exitReason||(Ne.exitReason=o),!Pe&&Ue.runtimeReady&&Be.runtimeKeepalivePop()}if(Ne.config&&Ne.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){v(`flushing std* streams failed: ${e}`)}}()}finally{tt(t,o)}})(),o;tt(t,o)}function tt(e,t){if(Pe&&Ue.runtimeReady&&Ue.nativeAbort)throw Ue.nativeAbort(t),t;if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||y("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!Ce)throw De&&ze.process?ze.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function ot(e){rt(e,e.reason,"rejection")}function nt(e){rt(e,e.error,"error")}function rt(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(v("Unhandled error:",t),et(1,t))}catch(e){}}!function(e){if(We)throw new Error("Loader module already loaded");We=!0,Ue=e.runtimeHelpers,Ne=e.loaderHelpers,Le=e.diagnosticHelpers,$e=e.api,ze=e.internal,Object.assign($e,{INTERNAL:ze,invokeLibraryInitializers:ve}),Object.assign(e.module,{config:Ee(Fe,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"e2f47b0110ed922f21a1522da67279133ce28f32",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Je,is_runtime_running:He,assert_runtime_running:Ze,mono_exit:et,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:re,resolve_single_asset_path:oe,setup_proxy_console:R,set_thread_prefix:p,installUnhandledErrorHandler:Qe,retrieve_asset_download:ae,invokeLibraryInitializers:ve,isDebuggingSupported:Ae,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Ne,l)}(Ve);let it,st,at,lt=!1,ct=!1;async function dt(e){if(!ct){if(ct=!0,Ce&&Ne.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&R("main",globalThis.console,globalThis.location.origin),Be||qe(!1,"Null moduleConfig"),Ne.config||qe(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Ve.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(Be,t),Te(Be,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Te(Be,e)}await async function(e){if(De){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Ne.modulesUniqueQuery=t.substring(o)),Ne.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Ne.scriptDirectory=(n=Ne.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Ne.locateFile=e=>"URL"in globalThis&&globalThis.URL!==P?new URL(e,Ne.scriptDirectory).toString():L(e)?e:Ne.scriptDirectory+e,Ne.fetch_like=C,Ne.out=console.log,Ne.err=console.error,Ne.onDownloadResourceProgress=e.onDownloadResourceProgress,Ce&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Ne.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Ne.isChromium=e.userAgent.includes("Chrome"),Ne.isFirefox=e.userAgent.includes("Firefox"))}ze.require=De?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=P)}(Be)}}async function ut(e){return await dt(e),Ge=Be.onAbort,Ke=Be.onExit,Be.onAbort=Ye,Be.onExit=Xe,Be.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),lt?Ne.diagnosticTracing&&h("mono config already received"):(Ee(Ne.config,n),Ue.monoThreadInfo=r,je(),Ne.diagnosticTracing&&h("mono config received"),lt=!0,Ne.afterConfigLoaded.promise_control.resolve(Ne.config),Ce&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Ne.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Ne.afterConfigLoaded.promise,function(){const e=Ne.config;e.assets||qe(!1,"config.assets must be defined");for(const t of e.assets)ee(t),K[t.behavior]&&F.push(t)}(),setTimeout((async()=>{try{await re()}catch(e){et(1,e)}}),0);const e=ft(),t=await Promise.all(e);return await mt(t),Be}():async function(){var e;await Se(Be),se();const t=ft();(async function(){try{const e=oe("dotnetwasm");await le(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||qe(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{Ce&&"application/wasm"!==o&&y('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Ne.diagnosticTracing&&h("instantiate_wasm_module buffered"),n=Me?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Ne.wasmCompilePromise.promise_control.resolve(n)}catch(e){Ne.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{k(),function(){const e=oe("js-module-threads"),t=[];for(let o=0;o<Ne.config.pthreadPoolInitialSize;o++){const o=Ne.workerNextNumber++,n=new Worker(e.resolvedUrl,{name:"dotnet-worker-"+o.toString().padStart(3,"0"),type:"module"});n.info={workerNumber:o,pthreadId:0,reuseCount:0,updateCount:0,threadPrefix:"          -    ",threadName:"emscripten-pool"},t.push(n)}Ne.loadingWorkers.promise_control.resolve(t)}(),await re()}catch(e){et(1,e)}}),0);const o=await Promise.all(t);return await mt(o),await Ue.dotnetReady.promise,await ye(null===(e=Ne.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await ve("onRuntimeReady",[Ve.api]),$e}()}function ft(){const e=oe("js-module-runtime"),t=oe("js-module-native");if(it&&st)return[it,st,at];"object"==typeof e.moduleExports?it=e.moduleExports:(Ne.diagnosticTracing&&h(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),it=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?st=t.moduleExports:(Ne.diagnosticTracing&&h(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),st=import(/*! webpackIgnore: true */t.resolvedUrl));const o=te("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?at=o.moduleExports:(Ne.diagnosticTracing&&h(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),at=import(/*! webpackIgnore: true */o.resolvedUrl))),[it,st,at]}async function mt(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Ve),t(Ve),c&&c.setRuntimeGlobals(Ve),await n(Be),Ne.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(Be,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),Be))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const gt=new class{withModuleConfig(e){try{return Te(Be,e),this}catch(e){throw et(1,e),e}}withOnConfigLoaded(e){try{return Te(Be,{onConfigLoaded:e}),this}catch(e){throw et(1,e),e}}withConsoleForwarding(){try{return Ee(Fe,{forwardConsoleLogsToWS:!0}),this}catch(e){throw et(1,e),e}}withExitOnUnhandledError(){try{return Ee(Fe,{exitOnUnhandledError:!0}),Qe(),this}catch(e){throw et(1,e),e}}withAsyncFlushOnExit(){try{return Ee(Fe,{asyncFlushOnExit:!0}),this}catch(e){throw et(1,e),e}}withExitCodeLogging(){try{return Ee(Fe,{logExitCode:!0}),this}catch(e){throw et(1,e),e}}withElementOnExit(){try{return Ee(Fe,{appendElementOnExit:!0}),this}catch(e){throw et(1,e),e}}withInteropCleanupOnExit(){try{return Ee(Fe,{interopCleanupOnExit:!0}),this}catch(e){throw et(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return Ee(Fe,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw et(1,e),e}}withWaitingForDebugger(e){try{return Ee(Fe,{waitForDebugger:e}),this}catch(e){throw et(1,e),e}}withInterpreterPgo(e,t){try{return Ee(Fe,{interpreterPgo:e,interpreterPgoSaveDelay:t}),Fe.runtimeOptions?Fe.runtimeOptions.push("--interp-pgo-recording"):Fe.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw et(1,e),e}}withConfig(e){try{return Ee(Fe,e),this}catch(e){throw et(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||qe(!1,"must be file path or URL"),Te(Be,{configSrc:e}),this}catch(e){throw et(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||qe(!1,"must be directory path"),Ee(Fe,{virtualWorkingDirectory:e}),this}catch(e){throw et(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,Ee(Fe,{environmentVariables:o}),this}catch(e){throw et(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||qe(!1,"must be dictionary object"),Ee(Fe,{environmentVariables:e}),this}catch(e){throw et(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&qe(!1,"must be boolean"),Ee(Fe,{diagnosticTracing:e}),this}catch(e){throw et(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||qe(!1,"must be number"),Ee(Fe,{debugLevel:e}),this}catch(e){throw et(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||qe(!1,"must be array of strings"),Ee(Fe,{applicationArguments:e}),this}catch(e){throw et(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||qe(!1,"must be array of strings"),Fe.runtimeOptions?Fe.runtimeOptions.push(...e):Fe.runtimeOptions=e,this}catch(e){throw et(1,e),e}}withMainAssembly(e){try{return Ee(Fe,{mainAssemblyName:e}),this}catch(e){throw et(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw et(1,e),e}}withApplicationEnvironment(e){try{return Ee(Fe,{applicationEnvironment:e}),this}catch(e){throw et(1,e),e}}withApplicationCulture(e){try{return Ee(Fe,{applicationCulture:e}),this}catch(e){throw et(1,e),e}}withResourceLoader(e){try{return Ne.loadBootResource=e,this}catch(e){throw et(1,e),e}}async download(){try{await async function(){dt(Be),await Se(Be),se(),k(),re(),await Ne.allDownloadsFinished.promise}()}catch(e){throw et(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ut(Be),Ve.api}()),this.instance}catch(e){throw et(1,e),e}}async run(){try{return Be.config||qe(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw et(1,e),e}}},pt=et,ht=ut;Me||"function"==typeof globalThis.URL||qe(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&qe(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),(Me||De)&&qe(!1,"This build of dotnet is multi-threaded, it doesn't support shell environments like V8 or NodeJS. See also https://aka.ms/dotnet-wasm-features"),void 0===globalThis.SharedArrayBuffer&&qe(!1,"SharedArrayBuffer is not enabled on this page. Please use a modern browser and set Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy http headers. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.EventTarget&&qe(!1,"This browser/engine doesn't support EventTarget API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),gt.withConfig(/*json-start*/{
  "mainAssemblyName": "CutTheRopeDX.Browser",
  "applicationEnvironment": "Development",
  "resources": {
    "hash": "sha256-pO3BtLZc29yJ5LZ3Tm08HzbbZFuVbAvGfngTA+8yj9k=",
    "jsModuleWorker": [
      {
        "name": "dotnet.native.worker.1t59g4t9vs.mjs"
      }
    ],
    "jsModuleNative": [
      {
        "name": "dotnet.native.k8gyoy9kow.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.xevcx800hs.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.6kpbz7d1h5.wasm",
        "hash": "sha256-JuWqjSGyLYNzHCbJdUeJSlzofDDaBqToEcGZh5NqXfU=",
        "cache": "force-cache"
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.0774chwaiw.wasm",
        "hash": "sha256-lBKCOBVvAMXlOis/l1+M33Cn6tKVgMg3bdHHrXj/a7Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.9iwncqwny2.wasm",
        "hash": "sha256-Ufg8lS+p6OZ00WWMeQqTGKA/IS8O9sECUPEuGvM5WA4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SkiaSharp.wasm",
        "name": "SkiaSharp.bk9rwkmequ.wasm",
        "hash": "sha256-KznhCHFrV/0h3AoWQjnKfHUIs98OhIyjSbrqkAK6rMg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.vc74ka0j2f.wasm",
        "hash": "sha256-P7qKvEHMowsS2wvBLOsl84cAPOho5yGcSqn3c4RfAWs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.VisualBasic.Core.wasm",
        "name": "Microsoft.VisualBasic.Core.ic4oks67r5.wasm",
        "hash": "sha256-AtC400vi85AY2+3JEyu7M0FZmzy5W/qPTQwnEYgE5WU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.VisualBasic.wasm",
        "name": "Microsoft.VisualBasic.oawltawhmj.wasm",
        "hash": "sha256-QIQIVsgVtOjss3PhGWReXuYJqZfXWjj4Ka9g42s9/kM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Primitives.wasm",
        "name": "Microsoft.Win32.Primitives.s2ph4qv5vy.wasm",
        "hash": "sha256-zAoHRLdLZqP68dDBMcDo5sAhGapRaZJYQz2aR03RDYI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Registry.wasm",
        "name": "Microsoft.Win32.Registry.205yp9wx9t.wasm",
        "hash": "sha256-LvXRTg75x2rR8pl0Bw85waJhB6rLFe8JUXJZHQVj1AA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.AppContext.wasm",
        "name": "System.AppContext.33lgp2bflw.wasm",
        "hash": "sha256-vz/SY7IT6HI0fgNQ8GZWZ+2a6G0TdNW8NiXfBQzCDFg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Buffers.wasm",
        "name": "System.Buffers.g7kq07we8q.wasm",
        "hash": "sha256-NBuJlJA0h3fyxW5UP4hoYInaEwe9OZxG2gEbjIdmCrY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.x8fciln3ov.wasm",
        "hash": "sha256-Mc7eRiV9aqhwslb6N7AN2lCrr5HWQzQsTgr0z2Mun9I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.9nsqwhhu4t.wasm",
        "hash": "sha256-haf/04roddsE9PJPtNQ70GK4E5Pgdvs8Xn7GWtwiB8E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.525tw7pi7d.wasm",
        "hash": "sha256-3Wp37kJjaV1lPseMx3LiVnPOb6jBbwgsqYQ5XifQfcI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.33r4c9ewf6.wasm",
        "hash": "sha256-H5J4UE+YDKwGT/+7eJ04nYWti5iFiGRcy+qc+mQi/O8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.24vmyuzyh8.wasm",
        "hash": "sha256-/m5kaNjqgMCMsEcsSRog2F7g58B4GLChdBV7b48gbdQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.sojjklgz5l.wasm",
        "hash": "sha256-lE1lvR0jcFeSBLguBCsrgQ6E/SwzEWSBo6DT1t+eyzE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.DataAnnotations.wasm",
        "name": "System.ComponentModel.DataAnnotations.q8seqyww2r.wasm",
        "hash": "sha256-hlc54d9ROri0ue7K99r10i4zkATiLhcQ9zo0q7W2hR4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.EventBasedAsync.wasm",
        "name": "System.ComponentModel.EventBasedAsync.7b6lvtlm4f.wasm",
        "hash": "sha256-M/bTWUvIaq4cjgVjpzDowRr/CILOEX/94pdcYydLVIk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.nwih63pj9c.wasm",
        "hash": "sha256-93uWz5htHU4mW5eFYLizhbEpyIP7wRw7m5BxQpDfSkA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.gq1uo9pwbw.wasm",
        "hash": "sha256-uC84qHy9xx+jXRXst6IaM1xt/w7LxUiXTeriFG4ZAiA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.gtzdp6gjij.wasm",
        "hash": "sha256-lEd4E48MsU5w1IehTBnjkEI2vNCXvuFPvPeMTyw3++U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Configuration.wasm",
        "name": "System.Configuration.q733dci1qs.wasm",
        "hash": "sha256-BnBG27W6TaVX+iCWFXq00o8F7GIIuUQtO0HkkMmwjMU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.to0mbsovya.wasm",
        "hash": "sha256-AzhPOHmII8SXRU+N5orETTSLHfAesDlXNBoICnlf/hw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Core.wasm",
        "name": "System.Core.u2m3d71w7g.wasm",
        "hash": "sha256-hktoMO5AO3E4jVeyyKAlshZeqkkro5fzQHXhi5U81DI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.egk653jyby.wasm",
        "hash": "sha256-Dm5qhx9pCRwBnSufwVi+O+VjtK1rysFi+H6awhdvvQE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.DataSetExtensions.wasm",
        "name": "System.Data.DataSetExtensions.a9dlaxjhfy.wasm",
        "hash": "sha256-ouu5ej3421SgXUzAYf44bxCQ7RUxrfwqwgmEwvh6k6A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.wasm",
        "name": "System.Data.2ib7pvtr2d.wasm",
        "hash": "sha256-+lrbq1XwHOxpfo6EgvytDnss9vHquqHNDNxHzzx8E9U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Contracts.wasm",
        "name": "System.Diagnostics.Contracts.9avde3cc7d.wasm",
        "hash": "sha256-oVmbsHtl970TzZDqARH51X9m2TcYMuebbCk8Uf9jyW0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Debug.wasm",
        "name": "System.Diagnostics.Debug.0akkuosl4u.wasm",
        "hash": "sha256-qOE7MrpIyjV9RclZShTpxbW0dXN9NSp6E8O6BCM4j/k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.us3v4sw3re.wasm",
        "hash": "sha256-Aqcp7AQ4SF2SidBLhSXGiBMx6wUGEmRGMUGtJuw5Biw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.FileVersionInfo.wasm",
        "name": "System.Diagnostics.FileVersionInfo.52zf5lzwq0.wasm",
        "hash": "sha256-PShcf3L0QvoHeHX6WO3KQqAuMpM1dUIF3bOHwdvM02k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Process.wasm",
        "name": "System.Diagnostics.Process.aksc3z10sf.wasm",
        "hash": "sha256-mnphv8xnpoUBaUm9xj1BKdq1ZtrmXgfNC1pTeUX8Z1A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.StackTrace.wasm",
        "name": "System.Diagnostics.StackTrace.ksjs8ibsdo.wasm",
        "hash": "sha256-zGzdEtt/DiOLHeCilkubGW1oA65rvQm80Tr7WdrouTU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TextWriterTraceListener.wasm",
        "name": "System.Diagnostics.TextWriterTraceListener.4dqf2t866y.wasm",
        "hash": "sha256-OAmvIaAFxlBfLbdbPMsrpB3c+g8LVN0zOy07o5j5Flw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tools.wasm",
        "name": "System.Diagnostics.Tools.4jmuc696pu.wasm",
        "hash": "sha256-cL64WwiWGdmdH0weZWJRZHKU7pWvR4JGCYHlGJGMroQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.xk40frpu51.wasm",
        "hash": "sha256-zx3DAw63Ez+eOuR0QiUXlEORykC36sM/02Nx4nt6tLU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.wcxnmzlrgf.wasm",
        "hash": "sha256-YKXtgvOTykO85veHTeONOfleMoP39SgKM7nDknAdNfk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.fht3cwi9ck.wasm",
        "hash": "sha256-/dvJgFicq8TLI4i4VdtMFPN1nKxit3i+vSbzahAe1cs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.cby5s9a0on.wasm",
        "hash": "sha256-+Dy89WFcA7dUgn0g1UJ8TjdZZQ6V8ZN0kZfrRA8xGJ4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Dynamic.Runtime.wasm",
        "name": "System.Dynamic.Runtime.yi4mxor0by.wasm",
        "hash": "sha256-lm4ZND3nHWnLXcMzRKXz3I2BGdWPik99ttzib2RVCpw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.56jjdsv3d0.wasm",
        "hash": "sha256-M0vQyUCJLFCrFQX/Bg7bPG8nfXfxjvEYTseZkbfGYxg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Tar.wasm",
        "name": "System.Formats.Tar.89bpoq7vrz.wasm",
        "hash": "sha256-xAroer71Mir0OA4S5cPejkZaL03TqTFg1aimzQ9LIok=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Globalization.Calendars.wasm",
        "name": "System.Globalization.Calendars.rildgn7mzz.wasm",
        "hash": "sha256-zZUFwm7oGVSq1qsK8oIZuzSLLXjmcoLgT1iy5qqXHp8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Globalization.Extensions.wasm",
        "name": "System.Globalization.Extensions.opr37tm2pn.wasm",
        "hash": "sha256-9HWY1aCFc5GoQcysEA0v85vU5i8CRuqZvKqJJpzka6k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Globalization.wasm",
        "name": "System.Globalization.moqtkrs3kx.wasm",
        "hash": "sha256-qnMi2/9zgAiBieR/7gLp8ZIASS2EbKk5F3FK/ZFHXn8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.Brotli.wasm",
        "name": "System.IO.Compression.Brotli.7ohel80nih.wasm",
        "hash": "sha256-CZooa2KeN4jmRIpQK41QSkQP6d4dmj++PSm0FlRGkuo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.FileSystem.wasm",
        "name": "System.IO.Compression.FileSystem.y83oisb571.wasm",
        "hash": "sha256-clgAvPC5qyl4EnAE8n7NPNbEX9+Y4Rpxpnxl5349y+4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.ZipFile.wasm",
        "name": "System.IO.Compression.ZipFile.tmxcz8z1z1.wasm",
        "hash": "sha256-uzfss5y8PFTeOVFAKk+jQLi/FLPKrehaUq6f+1xqeoQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.6pdq5v22pd.wasm",
        "hash": "sha256-2mhUJF3wl9QgdsvbtOy/ZDArJeyj8crmASfCqaGAtNw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.AccessControl.wasm",
        "name": "System.IO.FileSystem.AccessControl.xzbtcseu3i.wasm",
        "hash": "sha256-A0JUayiM8+PP3INOm0TFut8IWKzKDe4PcEZGksJchHU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.DriveInfo.wasm",
        "name": "System.IO.FileSystem.DriveInfo.g3te4cd6dq.wasm",
        "hash": "sha256-NPFQq5Ilvv6t6twDWNjv6zmCVVMv4GREj5xvBqMG71g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.Primitives.wasm",
        "name": "System.IO.FileSystem.Primitives.s8z1h6e7bs.wasm",
        "hash": "sha256-rJF209xyy75EKtaVFIXszQG504rNkNMzn5nuQgopOis=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.Watcher.wasm",
        "name": "System.IO.FileSystem.Watcher.jia322rvtg.wasm",
        "hash": "sha256-+1GYGl6rYRxD2mfq9jYmM71NOi5lVQ4ntSd2XgLQr/A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.wasm",
        "name": "System.IO.FileSystem.y4d3mjm0rs.wasm",
        "hash": "sha256-vjhZDTZZmOeM6kiHpKghpt2WLmy8+s51jgU3nWVoMsQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.IsolatedStorage.wasm",
        "name": "System.IO.IsolatedStorage.vucb3c4eed.wasm",
        "hash": "sha256-12gqkUA+EW9Ok+XjNnztHbwcZdF0sHGfYsGFDhkaJHA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.slhu4kxyuf.wasm",
        "hash": "sha256-YGcvm9Unqx7Nslxy7M0XGAICX/34Ac4rHJ1GgryesTc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.d9mh1mhl6a.wasm",
        "hash": "sha256-D2zGD+7FWanAQkGdcxPpzhuAqr1TBe3FwbCzyOEeDDc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipes.AccessControl.wasm",
        "name": "System.IO.Pipes.AccessControl.aawhalzgje.wasm",
        "hash": "sha256-sqt6fPu+tFpCJkBRmzTwCeFxWuNkv9Qvw6RRdtyLi/Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipes.wasm",
        "name": "System.IO.Pipes.6axf1j8g7w.wasm",
        "hash": "sha256-wlyNSMlOoSLtBjH4ahAIRUF/EIraBRKRS1mqdDW1BEc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.UnmanagedMemoryStream.wasm",
        "name": "System.IO.UnmanagedMemoryStream.jtjypz1bw3.wasm",
        "hash": "sha256-141FexMM+rgyJjbPV3Tqjins7IWx6QuAhdpWiGB8+wU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.wasm",
        "name": "System.IO.u03kcd51u2.wasm",
        "hash": "sha256-TrxbGqQLHCo+lECXU34H+9JxDj+EGVrjMrSa4JIhTpQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.AsyncEnumerable.wasm",
        "name": "System.Linq.AsyncEnumerable.qecnowng39.wasm",
        "hash": "sha256-kqYBPZyPoXxShJfn6Z4etPhqhi7wXEdqUL+YvjNrMa0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.48ueoty928.wasm",
        "hash": "sha256-hJy4f+HmGU4Xh4kza5OapM/UfFxlTnF0arbzmWUqEPM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Parallel.wasm",
        "name": "System.Linq.Parallel.1qxexjfvh4.wasm",
        "hash": "sha256-x8CA6KXN8GeQF7M+tkoJ8yCymiiJbt7h0zd3uzZRrvQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.bv9ee87bon.wasm",
        "hash": "sha256-d0dArG+pt8tZXMUGpFhpI18ztIMnH4waXkZ6KsKhqEI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.ffyao6dtjo.wasm",
        "hash": "sha256-y8xCXRiQfpwTV3uVD+XU9IZyYOBV3IUhbEzI8/FlECQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.85e2vmezig.wasm",
        "hash": "sha256-HOs9iHcJ/txf5aMww0FpOux1jkR837V4crHeRwax7oA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.Json.wasm",
        "name": "System.Net.Http.Json.lkg2pjap28.wasm",
        "hash": "sha256-ZYX5QZNYs9FBGbSqFOEHB1CSxj2o3HZlYgB+H8dfls8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.2nfkd1ffuc.wasm",
        "hash": "sha256-0vIjug0jiDfarfno0NX4iEq0U+7UcQ4UGK5Q2Hcnx7g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.HttpListener.wasm",
        "name": "System.Net.HttpListener.l269ngb85c.wasm",
        "hash": "sha256-/e2K/6DbHfR5WYWSWPEyXxwbwdeGUtCBfIxY3PyKhaI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Mail.wasm",
        "name": "System.Net.Mail.7s5j7d2u11.wasm",
        "hash": "sha256-B/+5emPbFkpK82pnJSnAmTzRuY7KRKi7wvTfFnULfh4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.NameResolution.wasm",
        "name": "System.Net.NameResolution.y3a25frvkb.wasm",
        "hash": "sha256-Ui9OtscoCa7Rn+R6uggcz2M7ywzHL64xb5x7hqyrRl8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.NetworkInformation.wasm",
        "name": "System.Net.NetworkInformation.6hh4xfj68d.wasm",
        "hash": "sha256-ej7w2CMrRXME9AFCOPRuLwPTCNJ5MfZYGaGYL4xpwiU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Ping.wasm",
        "name": "System.Net.Ping.blplcg5q7j.wasm",
        "hash": "sha256-Me8xKvJFcpGmQz0AsV1c2r9vpfCIAUEvRS8wXBIlB8s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.52l52f7ge8.wasm",
        "hash": "sha256-I7jNDlc6aY2jmzdqNKjL/MZtDTu9OXjmsPD4nXyeFio=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Quic.wasm",
        "name": "System.Net.Quic.aw952wuprs.wasm",
        "hash": "sha256-WqNOpml+SO8zGljApjO78PEvcIFKqDWK0LVTSKsFxIA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.k1mlkdyp0u.wasm",
        "hash": "sha256-KFXJT6HgrkCQDdxsNE6gg+fQHpN4MfAkgt3h6YXYvbM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Security.wasm",
        "name": "System.Net.Security.vm6w2umju9.wasm",
        "hash": "sha256-l4OlxqQwu+sYhjLriuJSuMwHNJ+r/BGVrXp92H+S3NQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.ServerSentEvents.wasm",
        "name": "System.Net.ServerSentEvents.adh3kntjlv.wasm",
        "hash": "sha256-rlq89aqpXUJXWQVg3RSoAJlvCpD0wwttk75XFhW7Bps=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.ServicePoint.wasm",
        "name": "System.Net.ServicePoint.v8e4bui0ea.wasm",
        "hash": "sha256-4Zv++S2GQBCLLKZxZWQfRW3vgfFi9iddABhfC0/YyoM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Sockets.wasm",
        "name": "System.Net.Sockets.ts6iauk88c.wasm",
        "hash": "sha256-E0uMfyK7c1v52Ax4PT7Al8rOKXtImY4piCmVV1h36sA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebClient.wasm",
        "name": "System.Net.WebClient.od0uvbnjit.wasm",
        "hash": "sha256-bBhkM6WRjt9KHqN/yR59aCMpgcg5lxrlHszjVilE9h0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.qf50eeagye.wasm",
        "hash": "sha256-hoFgNcO9TCczLQwT6qI84eb3J3qaSt95k4Jk1T6d4G8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebProxy.wasm",
        "name": "System.Net.WebProxy.iavyox40gr.wasm",
        "hash": "sha256-6k7n9kRTIjsvj7OlfcaAt7JtbA1BYzx/krXVj9B2al8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebSockets.Client.wasm",
        "name": "System.Net.WebSockets.Client.znf15dgm7w.wasm",
        "hash": "sha256-cQFzMj3dLSHant+c+qz8sIa6Dq1Uw0iAILqYAGZ6hF0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebSockets.wasm",
        "name": "System.Net.WebSockets.oek2p1up7o.wasm",
        "hash": "sha256-MK9DXHHm6AKhF5Je0S8xPCHgY0e0z4i+GMJ6TMhNOoI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.wasm",
        "name": "System.Net.i47gzsagt6.wasm",
        "hash": "sha256-7uRJ8dcmw3n7qTbvh1xPYnY0vmPYLapuPLmNF0k4e8I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Numerics.Vectors.wasm",
        "name": "System.Numerics.Vectors.hjvuy1g5cw.wasm",
        "hash": "sha256-077jX5PZwXTuEEf7WPePWlJKu2RSiRaUa3iGCDXh0hc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Numerics.wasm",
        "name": "System.Numerics.rkirn4ewf6.wasm",
        "hash": "sha256-y32dbXS60w1HfL97xSaaoig78fCA2hQirSUfe9ZGl30=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.i378yy84uu.wasm",
        "hash": "sha256-EoCxZODvWTOXgxLrSIGtMa2yjMKLeeK1JlfMuIAfMbc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.DataContractSerialization.wasm",
        "name": "System.Private.DataContractSerialization.sny9oej0eg.wasm",
        "hash": "sha256-SKiQcTZvy/3E4yYZXbAuxojifAxqCAALhFducmouT7M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.qtknb01vtj.wasm",
        "hash": "sha256-LoR8udworMoDhHJr1pjR6IZbwwAvlFu9wZWUfC5bdtw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.memmbl9fkq.wasm",
        "hash": "sha256-EjZ9rzHEnY68PXt05q3B/kbsekIDstXc7Sn5XRDvk1E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.zw12n4yipy.wasm",
        "hash": "sha256-Mx0L0SdPw6FcjUMwHIOX5eE8YOVQ6jMFlrmRiK+KkhQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.DispatchProxy.wasm",
        "name": "System.Reflection.DispatchProxy.3vrt3hlgt3.wasm",
        "hash": "sha256-T0nAzwQ4akMO9XJb2cgIhZsnc78p2+fxtnVD40l1XA4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.ldtsz75hxo.wasm",
        "hash": "sha256-R23hVtMJi0+JvwMAd0kNQbU9jjkN8Ksyxlwrei4F4h4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.Lightweight.wasm",
        "name": "System.Reflection.Emit.Lightweight.3uy3siz9rq.wasm",
        "hash": "sha256-5Zjt4H4qlav/tXY9riBZdtfSMx3i9nVOYwo0yegYxKw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.wasm",
        "name": "System.Reflection.Emit.skdd24233h.wasm",
        "hash": "sha256-/DdXENWMDIBzeiK9G1fBb9iFHnsY1fem4Lt1KEc7MhQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Extensions.wasm",
        "name": "System.Reflection.Extensions.182qm6arqh.wasm",
        "hash": "sha256-P2Qk2OLacQqt2Llp1r47hyo48QLV06MpAlAZXa35u8c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.5mrm43mmwy.wasm",
        "hash": "sha256-TYUTGCId0GxyLd2Jv9MzjCaGIiyVHaCQ9dFDARceTQA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.kwafmed7n2.wasm",
        "hash": "sha256-9ELqd1Txtq1g9sr4X2g5MY/G+jKpkvMAKYa3+F3EJBw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.TypeExtensions.wasm",
        "name": "System.Reflection.TypeExtensions.kadrmr8s04.wasm",
        "hash": "sha256-DB7emN+IZ1xSOiVDQF0txVnrDR5l1dCkghVafNZXKDA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.wasm",
        "name": "System.Reflection.14urzokzzb.wasm",
        "hash": "sha256-z8vs8oc+dKapwTQeJ57oDBrsDsHLYwVv3iVtzebNxZo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Resources.Reader.wasm",
        "name": "System.Resources.Reader.o5l4jqwkcn.wasm",
        "hash": "sha256-HN9FyXSEtGpwrjaWYqr0BYnAF5LhvVg5YyAOfj59K/w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Resources.ResourceManager.wasm",
        "name": "System.Resources.ResourceManager.u0kj92um25.wasm",
        "hash": "sha256-4sISLJ4CC3eWntk5TFLGQP39skJD43fZt2tHEKDrQ7w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Resources.Writer.wasm",
        "name": "System.Resources.Writer.fybhus075b.wasm",
        "hash": "sha256-x+TbpI+502ck5N3QVtiTNFvaRmEzfM6AUQezqym5L34=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.Unsafe.wasm",
        "name": "System.Runtime.CompilerServices.Unsafe.a2v8uztr6q.wasm",
        "hash": "sha256-vtZgLdKVZ4XAh9LNuAg07pdJWav2ZTSdji3wBl6Tnak=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.VisualC.wasm",
        "name": "System.Runtime.CompilerServices.VisualC.h9ibm7eot2.wasm",
        "hash": "sha256-NWO0niQAT2U38QP2p678YrYceWxfcGZiao7o4SRm/lI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Extensions.wasm",
        "name": "System.Runtime.Extensions.oueezzziy7.wasm",
        "hash": "sha256-sGE96dH2hSZ2o95KQyX/KhuQGnsAFEHdXfHf2rJrSYY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Handles.wasm",
        "name": "System.Runtime.Handles.pegxo55rww.wasm",
        "hash": "sha256-r9JfKdsE92m/EaS+G9TnZ8alLJ37y9loMJDwpuhyt/4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.mqmqa0ahe3.wasm",
        "hash": "sha256-YuCputnc0/SoU/JqvYwROTySbCdsB0eoDsynrg/Eq9o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "name": "System.Runtime.InteropServices.RuntimeInformation.himsthc3a6.wasm",
        "hash": "sha256-+QFSX4Pa6oEemBGAbLSx6ddeliBDgepZ+wpUyQqPbsw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.rcbdxvdyyd.wasm",
        "hash": "sha256-RZjweY6kwGuPg4IhdB/ENBZnlLqZwVGf/ILzJSOM8Bg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Intrinsics.wasm",
        "name": "System.Runtime.Intrinsics.3m0sll9ngp.wasm",
        "hash": "sha256-5RQ/ALwIXh6MYeZCPjap6QQKenbjZVgBA+FTR7tBnpQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Loader.wasm",
        "name": "System.Runtime.Loader.0cdunuu6g0.wasm",
        "hash": "sha256-AK7bymNvVMAgFeNL8RCcERl87sybDN0Jbh/ttgXOUCo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.c79r80p0xa.wasm",
        "hash": "sha256-qAA+g2R9BL+KkiVw/uSdgBzcMyh6lHjvE8btAPFlf44=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.9sqv4pjt0k.wasm",
        "hash": "sha256-p25NPN+dGwPaJc8nGMN2PxVBqi6TxQ790Tlo+ZL3oTY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Json.wasm",
        "name": "System.Runtime.Serialization.Json.4u1byp8ddu.wasm",
        "hash": "sha256-9PvflPMpTgXt/CJr9aPaMFxrcfb9dfyCWfQcHjBZ/Lw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.0677mizgg8.wasm",
        "hash": "sha256-CK47ivfrIuMw7yupuqFV24kdTeMPxzka4edYB/BUK9I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Xml.wasm",
        "name": "System.Runtime.Serialization.Xml.7t5vv8ymb3.wasm",
        "hash": "sha256-1ZF5POZglEr7ftw2T6suEvJDtXBOaTWjwiFNqHM6A14=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.wasm",
        "name": "System.Runtime.Serialization.xyb15dfsu9.wasm",
        "hash": "sha256-2VvOlAvLHV9Hmwglfi2ZMv/OBChHICovaG0z7JoV4/s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.owb4z3799n.wasm",
        "hash": "sha256-SLQCvZQdrph6c8+DdVZ3G9PLul9lQprZhbVdmsBKjfQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.AccessControl.wasm",
        "name": "System.Security.AccessControl.9gsd8k6c5m.wasm",
        "hash": "sha256-t/Zhd+N29fKKAil705KO0KB8ytqtRMQ2gIUgle8vQxU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.l0ljqfaxwo.wasm",
        "hash": "sha256-JcfUg2gv1aAcLpXhGHpawjy/Te3Qg9fcheHexSFJsec=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.i0xv6lwo7z.wasm",
        "hash": "sha256-4vLqnvj48uhFTeNavhXSPLej8+a04vT4Q4BzeA7aOJc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Cng.wasm",
        "name": "System.Security.Cryptography.Cng.eeehrv0scy.wasm",
        "hash": "sha256-2sUCiaSAJyXHG/+fD4xucBGmWPzXRTVKmMn/tpyrwMs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Csp.wasm",
        "name": "System.Security.Cryptography.Csp.2c9gox8ebd.wasm",
        "hash": "sha256-vjBPq4f54O+P5zvokIBJUwXcSpez9Y+PGc0wtzqW6W4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Encoding.wasm",
        "name": "System.Security.Cryptography.Encoding.axny8s8hqs.wasm",
        "hash": "sha256-Ypo7uNzxzTGJIC9jT/m/b4kN4txarBQHeb5H9RXu54k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.OpenSsl.wasm",
        "name": "System.Security.Cryptography.OpenSsl.1sxm4ayhhy.wasm",
        "hash": "sha256-gaDsyTJrtp4XzQYUXgmfB6RLIGi2FjWj8Ar3P9WDT/4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Primitives.wasm",
        "name": "System.Security.Cryptography.Primitives.4ri0a9h1v4.wasm",
        "hash": "sha256-8LydFSbE7V5LdD50fXdpmeIt/m2sksGJqzMY5e6vP4Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.X509Certificates.wasm",
        "name": "System.Security.Cryptography.X509Certificates.rncai5fzz3.wasm",
        "hash": "sha256-aWvCLknwVe+mKmgXO2xDc5IhC7B6PLDmWOFFf933b/o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.2ufhqnonzh.wasm",
        "hash": "sha256-asDjhVEPO/QN5eJuPJXMjymopyT1voLEIPbRMo6SpJM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Principal.Windows.wasm",
        "name": "System.Security.Principal.Windows.9gaajfy1mm.wasm",
        "hash": "sha256-aUJqbqjVpUgPNm/I10ZI5tTZvdAHZuXZHM1+bgtEh2Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Principal.wasm",
        "name": "System.Security.Principal.1tjw5xr7f1.wasm",
        "hash": "sha256-ReXTuJnKsfUr67WZ7ekLkKwdCADP7MLsv5+8Rz9kUbM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.SecureString.wasm",
        "name": "System.Security.SecureString.hbgjudeeg7.wasm",
        "hash": "sha256-XWsfTgbMvq8bIErWG9SRS12GjUA70gfii8Zn1x06wo4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.wasm",
        "name": "System.Security.ua0hvadql2.wasm",
        "hash": "sha256-xlJkQOl9i3U3R0rHBnv42WUyxpyTfb4NWeQP9thvn8k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Web.wasm",
        "name": "System.ServiceModel.Web.a5nn12k2du.wasm",
        "hash": "sha256-EoKhlu6LFf/rxXLNN0AG/ox3cVZSQZcoJHRMn3Ai3ZM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceProcess.wasm",
        "name": "System.ServiceProcess.mzhiaa0o9m.wasm",
        "hash": "sha256-kt3OXJkHVIZ0HaKa/O5mKV/gKK2VRUPUcZlR1mMEWqI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.CodePages.wasm",
        "name": "System.Text.Encoding.CodePages.fso8gniga6.wasm",
        "hash": "sha256-fxt6zzGzOdxcGfVxV+shFrqbQSKxSfGJNB7/GqvLsB8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.jcgxo87ry4.wasm",
        "hash": "sha256-/cYfUxuTOta6h7UkMF1Gdjv4pimMyvkPZH4lqS2QkWk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.wasm",
        "name": "System.Text.Encoding.hen1lijr2s.wasm",
        "hash": "sha256-RybkW+87HvDCrKwpsSLXM3w5TB5EMz7dpLJz1o+fFaI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.s63xwzfs6e.wasm",
        "hash": "sha256-ZAoPykd2oHgSQyIJbM0ktKOTvV6mh7f8h4Ev8xRgPJk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.e68ojdl57q.wasm",
        "hash": "sha256-ZhbF4R3Uf6o3EptGsHICrb2qcZ2bd1UEGfHtMc+VkxY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.o5g45g5kfe.wasm",
        "hash": "sha256-zN+88osSOmhdIdVgihibx/x1XedKWsCYEgvtcYvxypY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.AccessControl.wasm",
        "name": "System.Threading.AccessControl.vdpdtl3x6u.wasm",
        "hash": "sha256-w+LhmzUpdAZw6jVH9FdmsnN/n9z3LtLHTZR6pyxGSzg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Channels.wasm",
        "name": "System.Threading.Channels.wty3mw4oue.wasm",
        "hash": "sha256-7JYMWtx5aaztvI6qsJStob8sRMLyMrT6oDNkD24Inaw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Overlapped.wasm",
        "name": "System.Threading.Overlapped.vv5g078jxo.wasm",
        "hash": "sha256-yz1+Mqxaxt5V0brEHiLd/OtWtmY8/ic2z9aJief7Yqk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Dataflow.wasm",
        "name": "System.Threading.Tasks.Dataflow.1qphddued4.wasm",
        "hash": "sha256-h4ITo++VVySJB9UXW1AizkqXGbRc7hysEJPM8paCQBQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Extensions.wasm",
        "name": "System.Threading.Tasks.Extensions.a6m6fd88nw.wasm",
        "hash": "sha256-Pgd/40O6xPGNbTDdtZ7IXhjog5u+uiSnSeblax0Kd2w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Parallel.wasm",
        "name": "System.Threading.Tasks.Parallel.34k6gswm6i.wasm",
        "hash": "sha256-rdSdYP0iSs6wAHwkqd7CNb4nnTO5iiVLbd4et0eZjR8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.wasm",
        "name": "System.Threading.Tasks.ko7yntasn6.wasm",
        "hash": "sha256-ZAZ/8IqOgKMUtbsFNyZ/nGPxSrgnh8t4h5Z+SVjecyY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.dwlzwacph9.wasm",
        "hash": "sha256-Yx7qptgJ/CfjceK6H9vwI/vnuz1EwkAVooAmLaw1Tks=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.ThreadPool.wasm",
        "name": "System.Threading.ThreadPool.rlxoowigse.wasm",
        "hash": "sha256-4Yf7uRzT++KF9vmqiD1MJyPIwwLoQvlZmqyqRw2JJmI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Timer.wasm",
        "name": "System.Threading.Timer.23ma43391f.wasm",
        "hash": "sha256-spGH+vGozMmLNWcgCowJHX/L9fBEdoHOEveQK9OdmxI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.vkljcd8d2v.wasm",
        "hash": "sha256-/5PLEHCqj/ZEr93AEaO7c04J33xwc554dI5jyC6qbo0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Transactions.Local.wasm",
        "name": "System.Transactions.Local.vhgy89wfp9.wasm",
        "hash": "sha256-/etlP37Z3fbLkp3G+SuI8t2EuBlW6ArNkc821ii6YrU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Transactions.wasm",
        "name": "System.Transactions.1k679dq1nh.wasm",
        "hash": "sha256-DwZ5kQKS8S//BhRIzWNpCBtH7PWn1RUGmLKfunzItyI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ValueTuple.wasm",
        "name": "System.ValueTuple.gm53bht7l7.wasm",
        "hash": "sha256-yGHllPKjSV7O8dufUyuOGmky/GbwzH0IlPDpgsfuZG4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.xg7fizhwzt.wasm",
        "hash": "sha256-b150ZISvFUH8voYwQdhIH/m8vkHcJFY+LFDfuemZ2sw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.wasm",
        "name": "System.Web.sakoricpi1.wasm",
        "hash": "sha256-PADclgEUTNPtXvaKE9YgE1DRcW/Q+gPLdwMUsbu8esA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Windows.wasm",
        "name": "System.Windows.98z5iu2ekq.wasm",
        "hash": "sha256-mWvSjccrBX09Q7oIJzRGJIi6zQl0pJMKkSrWN9kWf6Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.4w1i83kr6d.wasm",
        "hash": "sha256-FM7him4hRwYj3b/rUlLVoDuzrDlojL6J1pMTiiv+prk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.gt2wkfrpd2.wasm",
        "hash": "sha256-RPbWKMyF0PcAToP99SZP3iI1LbK+2mMn0hPGIrJuwMI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Serialization.wasm",
        "name": "System.Xml.Serialization.ymsdqvtcj5.wasm",
        "hash": "sha256-OtgEHFA+kC4Og+9sy9AItDeN0G36r5KKP80acvekmKQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XDocument.wasm",
        "name": "System.Xml.XDocument.nthxjrhml8.wasm",
        "hash": "sha256-hVjT4ogBaijnAej8Jkvvfi/3R1Sz65EOhwcQavaAH8I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XPath.XDocument.wasm",
        "name": "System.Xml.XPath.XDocument.64udcjx5rc.wasm",
        "hash": "sha256-Sh41QbA3ENHi4CfpbioGcvLy8HrcPA2WVz/gL9fH5lA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XPath.wasm",
        "name": "System.Xml.XPath.m6ukudree9.wasm",
        "hash": "sha256-zjcKkw6BNuo0vSx0rlxPlbNuoXjUPWYT9Q1xX548wAU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XmlDocument.wasm",
        "name": "System.Xml.XmlDocument.uqap183j3j.wasm",
        "hash": "sha256-WkzkDq1p5Hr8baeIcyUvZkqCz0Qtl39PQvxQVm0EQkA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XmlSerializer.wasm",
        "name": "System.Xml.XmlSerializer.kyxgnik2yp.wasm",
        "hash": "sha256-7M5Yf1qrKhJZ1ts2o6P73IDZwOinWT1m/rX9xwhvX18=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.wasm",
        "name": "System.Xml.gccv71ojjn.wasm",
        "hash": "sha256-QJsL5vasxIwvmlNTlOtLvB4u9y1eFnTzQk9qyIkunDo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.3yytf291ln.wasm",
        "hash": "sha256-1SI+Mn25Aie86jc2yWbEfvQAHZTlFJwPLWoWwUH9CW4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "WindowsBase.wasm",
        "name": "WindowsBase.nd3r6urbkm.wasm",
        "hash": "sha256-JUj0SUenc5aNsprOIJomnkeHQU0zOM9KnaF9DBYp5as=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "mscorlib.wasm",
        "name": "mscorlib.4tt3wbhbdq.wasm",
        "hash": "sha256-WEqyK3x9MI7hKmttN/LE+RL3uxosR4rSLwqZmKMEs+Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.mldj9sxfgd.wasm",
        "hash": "sha256-mjS5yWaNc50QCQYxnfszJxwcDxuazYqhsYbvwGDqzuI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.g0vxt2435z.wasm",
        "hash": "sha256-wF+T2VumxJKvwEu98hSJTtBG4o++eX6S76idZxh2bFc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CutTheRopeDX.Core.wasm",
        "name": "CutTheRopeDX.Core.0ulrdase47.wasm",
        "hash": "sha256-SHyIaxYGQi4bV0JPArFp1oj3VHK5PRPiDp5w2LZtD5s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CutTheRopeDX.Rendering.Skia.wasm",
        "name": "CutTheRopeDX.Rendering.Skia.kik7780lgr.wasm",
        "hash": "sha256-nCol+aDnNI8qqoNgbNx8NqoJGeXobCIDRboF/la8+p8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CutTheRopeDX.Browser.wasm",
        "name": "CutTheRopeDX.Browser.9oqqabuevz.wasm",
        "hash": "sha256-d0BRYvQkooucOuG/m/hZT77ip2y5CKyWNbJizHbKqSw=",
        "cache": "force-cache"
      }
    ],
    "assembly": [],
    "corePdb": [
      {
        "virtualPath": "CutTheRopeDX.Core.pdb",
        "name": "CutTheRopeDX.Core.49po56kel0.pdb",
        "hash": "sha256-KK3ElFVXyJ+CjUwU02KOe0GPa+r5XVPy0OwPN77UoX4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CutTheRopeDX.Rendering.Skia.pdb",
        "name": "CutTheRopeDX.Rendering.Skia.8ru0gzedyf.pdb",
        "hash": "sha256-tDf5xG5qUJ4dhY4xBvpMiVrltJVSf+H8QA52Nc/V2lY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CutTheRopeDX.Browser.pdb",
        "name": "CutTheRopeDX.Browser.01qjtl7dq1.pdb",
        "hash": "sha256-fJTqLySxnhP592+Sg7L5Mmy1A1n34/LytV4ZioOExsY=",
        "cache": "force-cache"
      }
    ]
  },
  "debugLevel": -1,
  "globalizationMode": "invariant",
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability": true,
        "System.ComponentModel.DefaultValueAttribute.IsSupported": false,
        "System.ComponentModel.Design.IDesignerHost.IsSupported": false,
        "System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization": false,
        "System.ComponentModel.TypeDescriptor.IsComObjectDescriptorSupported": false,
        "System.Data.DataSet.XmlSerializationIsSupported": false,
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.Globalization.Invariant": true,
        "System.TimeZoneInfo.Invariant": false,
        "System.Globalization.PredefinedCulturesOnly": true,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.ResourceManager.AllowCustomResourceTypes": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported": true,
        "System.Runtime.InteropServices.BuiltInComInterop.IsSupported": false,
        "System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting": false,
        "System.Runtime.InteropServices.EnableCppCLIHostActivation": false,
        "System.Runtime.InteropServices.Marshalling.EnableGeneratedComInterfaceComImportInterop": false,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.StartupHookProvider.IsSupported": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": false,
        "System.Threading.Thread.EnableAutoreleasePool": false
      }
    }
  }
}/*json-end*/);export{ht as default,gt as dotnet,pt as exit};
