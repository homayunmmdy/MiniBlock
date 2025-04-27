import './styles/main.css'
import './ts/game.ts'
import './ts/Controller/soundController.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="mainGround">
      <div class="gridContainer" id="gridContainer"></div>
      <div class="user" id="user"></div>
    </div>
     <div class="inventory-box">
        <div class="slot bush"  data-bush-count="0"><span class="bush-count">0</span></div>
        <div class="slot sheep" data-sheep-count="0"><span class="sheep-count">0</span></div>
        <div class="slot"></div>
    </div>
     <div class="sound-toggle" id="soundToggle">
        <div class="sound-icon sound-on" id="soundIcon"></div>
    </div>
`

