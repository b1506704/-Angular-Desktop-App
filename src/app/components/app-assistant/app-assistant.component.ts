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
    public response = 'Response';

    constructor(
        private httpService: HttpService
    ) { }

    ngOnInit() {
    }

    public onKeyDown(e: KeyboardEvent) {
        if (e && e.key === 'Enter') {
            this.onSearch();
        }
    }

    public onSearch() {
        this.httpService.verify(this.data).subscribe(res => {
            this.response = res.suggestion;
        });
    }
}
