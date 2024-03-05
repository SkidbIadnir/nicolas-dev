<script lang="ts">
    import { onMount } from 'svelte';
    import { getCookie, setCookie } from '$lib/utils/cookies';
    import uk from '$lib/assets/flags/uk.png'
    import fr from '$lib/assets/flags/fr.png'
    import kr from '$lib/assets/flags/kr.png'


    let lang = 'en';
    let selectedLanguage: string;
    let selectedLanguageFlag: string;
    const languageOptions = [
        {name: 'English', code: 'en', flag: uk},
        {name: 'Français', code: 'fr', flag: fr},
        {name: '한국어 *soon*', code: 'en', flag: kr},
    ]

    onMount(() => {
        lang = getCookie('lang') || 'en';
        
        for (let i = 0; i < languageOptions.length; i++) {
            if (languageOptions[i].code === lang) {
                selectedLanguage = languageOptions[i].name;
                selectedLanguageFlag = languageOptions[i].flag;
                break;
            }
            
            
          }
    });


    function changeLanguage(newLang: string) {
    lang = newLang;
    for (let i = 0; i < languageOptions.length; i++) {
      if (languageOptions[i].code === lang) {
        selectedLanguage = languageOptions[i].name;
        selectedLanguageFlag = languageOptions[i].flag;
        break;
      }
    }
    setCookie("lang", lang, 30);
  }

</script>

<div class="dropdown">
    <div tabindex="0" role="button" class="btn m-1"><img src={selectedLanguageFlag} alt="" class="w-5 h-5"/>{selectedLanguage}</div>
    <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        {#each languageOptions as language}
            <li>
                <button on:click={() => changeLanguage(language.code)} class="flex items-center gap-2">
                    <img src={language.flag} alt={language.name} class="w-5 h-5" />
                    <span>{language.name}</span>
                </button>
            </li>
        {/each}
    </ul>
  </div>