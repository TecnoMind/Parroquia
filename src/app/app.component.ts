import {Component} from '@angular/core';
import * as fs from 'fs';
// tslint:disable-next-line:no-implicit-dependencies

import {SettingsImpl} from './db/repository/impl/settings.impl';
import {DataAccessImpl} from './db/repository/impl/data-access.impl';
// Importing style.scss allows webpack to bundle stylesheet with application
import '../assets/sass/style.scss';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
})
export class AppComponent {

    private dataAccess: DataAccessImpl;

    constructor(private settings: SettingsImpl) {
        this.settings.initialize();
        this.dataAccess = new DataAccessImpl(settings);

        if (!fs.existsSync(this.settings.dbPath) && this.settings.hasFixedDbLocation) {
            console.log("existe");
            this.createDb(this.settings.dbPath);
        }
    }

    public createDb(filename: string) {

        this.dataAccess.createDb(filename)
            .then((dbPath) => {
                if (!this.settings.hasFixedDbLocation) {
                    this.settings.dbPath = dbPath;
                    this.settings.write();
                }
            })
            .then(() => {
               // this.getHeroes();
            })
            .catch((reason) => {
                console.log(reason);
            });
    }



}
