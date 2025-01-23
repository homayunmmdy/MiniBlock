import './styles/main.css'
import './ts/game.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="mainGround">
      <div class="gridContainer" id="gridContainer"></div>
      <div class="user" id="user"></div>
    </div>
`

