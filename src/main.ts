import './styles/main.css'
import './ts/game.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="mainGround">
      <div class="gridContainer" id="gridContainer"></div>
      <div class="user" id="user"></div>
    </div>
     <div class="inventory-box">
        <div class="slot bush" data-bush-count="0"><span class="bush-count">0</span></div>
        <div class="slot"></div>
        <div class="slot"></div>
    </div>
`

