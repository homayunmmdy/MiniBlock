export class SoundController {
    private soundToggle: HTMLElement;
    private soundIcon: HTMLElement;
    private isMuted: boolean;
    private static instance: SoundController;

    private constructor(toggleId: string, iconId: string) {
        const toggleElement = document.getElementById(toggleId);
        const iconElement = document.getElementById(iconId);

        if (!toggleElement || !iconElement) {
            throw new Error('Sound toggle or icon element not found.');
        }

        this.soundToggle = toggleElement;
        this.soundIcon = iconElement;
        this.isMuted = false;

        this.setupClickHandler();
    }

    public static initialize(toggleId: string, iconId: string): void {
        if (!SoundController.instance) {
            SoundController.instance = new SoundController(toggleId, iconId);
        }
    }

    private setupClickHandler(): void {
        this.soundToggle.addEventListener('click', () => {
            this.toggleSound();
        });
    }

    private toggleSound(): void {
        this.isMuted = !this.isMuted;

        if (this.isMuted) {
            this.soundIcon.classList.remove('sound-on');
            this.soundIcon.classList.add('sound-off');
        } else {
            this.soundIcon.classList.remove('sound-off');
            this.soundIcon.classList.add('sound-on');
        }
    }

    public static isSoundMuted(): boolean {
        return SoundController.instance?.isMuted ?? false;
    }
}
