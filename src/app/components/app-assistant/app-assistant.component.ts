import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { HttpService } from '../../services/http.service';

@Component({
    selector: 'app-assistant',
    templateUrl: './app-assistant.component.html',
    styleUrls: ['./app-assistant.component.scss']
})
export class AppAssistantComponent implements OnInit {
    public data = '';
    public transcript = 'Transcription';
    public suggest = 'Suggestion';
    public msgNotJoin = `You haven't started any session yet. Please join one`;
    public msgNotStart = 'Please click Start to listen to audio output and request live suggestions from OpenAI';

    public isJoined = false;
    public isStarted = false;


    constructor(
        private httpService: HttpService
    ) { }

    ngOnInit() {
    }

    public toggleSession() {
        this.isJoined = !this.isJoined;
        this.isStarted = false;
        this.transcript = 'Transcription';
    }

    public toggleSuggestion() {
        this.isStarted = !this.isStarted;
        this.suggest = 'Suggestion';
    }
}
