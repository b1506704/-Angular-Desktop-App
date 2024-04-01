import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import * as io from 'socket.io-client';

@Component({
    selector: 'app-assistant',
    templateUrl: './app-assistant.component.html',
    styleUrls: ['./app-assistant.component.scss']
})
export class AppAssistantComponent implements OnInit, AfterViewInit {
    @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef;
    @ViewChildren('item') itemElements: QueryList<any>;
    public data = '';
    public transcription = '';
    public suggestion = '';
    public msgNotJoin = `You haven't started any session yet. Please join one`;
    public msgNotStart = 'Please click Start to listen to audio output and request live suggestions from OpenAI';
    public isJoined = false;
    public isStarted = false;

    private userId: string;
    private socket: any;
    private scrollContainer: any;
    private isNearBottom = true;

    constructor(
    ) { }

    ngAfterViewInit(): void {
        this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());
    }

    ngOnInit() {
        this.userId = uuidv4();
    }

    private onItemElementsChanged(): void {
        if (this.isNearBottom) {
            this.scrollToBottom();
        }
    }

    private scrollToBottom(): void {
        if (this.scrollFrame && this.scrollFrame.nativeElement) {
            this.scrollContainer = this.scrollFrame.nativeElement;
            this.scrollContainer.scroll({
                top: this.scrollContainer.scrollHeight,
                left: 0,
                behavior: 'smooth'
            });
        }
    }

    private isUserNearBottom(): boolean {
        const threshold = 150;
        const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
        const height = this.scrollContainer.scrollHeight;
        return position > height - threshold;
    }

    scrolled(event: any): void {
        this.isNearBottom = this.isUserNearBottom();
    }

    public joinSession() {
        this.isJoined = true;
        this.socket = io('http://127.0.0.1:5000/');
        this.socket.emit('join-session', this.userId);

        this.socket.on('join-session-response', (data: string) => {
            console.log(data);
        });
    }

    public leaveSession() {
        this.isJoined = false;
        this.isStarted = false;
        this.socket.emit('leave-session', this.userId);

        this.socket.on('leave-session-response', (data: string) => {
            console.log(data);
            this.transcription = '';
            this.suggestion = '';
        });
    }

    public startAssistant() {
        this.isStarted = true;
        this.socket.emit('start-assistant', this.userId);

        this.socket.on('start-assistant-transcription-response', (data: string) => {
            console.log(data);

            if (data) {
                this.transcription += data;
            }
        });

        this.socket.on('start-assistant-suggestion-response', (data: string) => {
            console.log(data);

            if (data) {
                this.suggestion += data;
            }
        });
    }

    public stopAssistant() {
        this.isStarted = false;
        this.socket.emit('stop-assistant', this.userId);

        this.socket.on('stop-assistant-response', (data: string) => {
            console.log(data);
        });

        this.transcription = '';
        this.suggestion = '';
    }
}
