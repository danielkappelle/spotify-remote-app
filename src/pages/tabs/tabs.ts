import { Component } from '@angular/core';

import { SearchPage } from '../search/search';
import { PlayerPage } from '../player/player';
import { SettingsPage } from '../settings/settings';

@Component({
    templateUrl: 'tabs.html'
})

export class TabsPage {
    tab1Root = SearchPage;
    tab2Root = PlayerPage;
    tab3Root = SettingsPage;

    constructor () {

    }
}