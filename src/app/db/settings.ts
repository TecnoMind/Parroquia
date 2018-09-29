import {existsSync, readFileSync, writeFileSync} from 'fs';
import * as path from 'path';
// tslint:disable-next-line:no-implicit-dependencies
import {remote} from 'electron';
import {Injectable} from "@angular/core";

/**
 * Class Settings holds information required by the application.
 * Settings uses settings.json to persist relevant information across sessions.
 *
 * @export
 * @class Settings
 */
@Injectable()
export class Settings implements SettingsDB{
    /** Folder where data files are located */
    public  dbFolder: string;
    /** Path to database file used by application*/
    public  dbPath: string;
    /** Determines if database location can be set by user (false), or is fixed by application (true). */
    public  hasFixedDbLocation = true;
    /**
     * Sets database location when hasFixedDbLocation === true.
     * For valid values see https://github.com/electron/electron/blob/master/docs/api/app.md#appgetpathname.
     */
    public  fixedLocation = 'userData';

    /** Default name of folder containing data files. */
    public  dataSubFolder = 'dist/assets/data';
    /** Default name of database file. */
    public  dbName = 'parroquia.db';

    /** Location of settings.json file */
    public  settingsPath: string;

    /**
     * Settings.initialize must be called a startup of application and determines the locations of database
     *
     * @static
     * @memberof Settings
     */
    initialize(): void {
        this.getPaths();

        if (!this.hasFixedDbLocation) {
            if (!existsSync(this.settingsPath)) {
                this.write();
            }
            this.read();
        }
    }

    read(): void {
        const settings = JSON.parse(readFileSync(this.settingsPath, { encoding: 'utf8' }));
        this.fromJson(settings);
    }

    write(): void {
        writeFileSync(this.settingsPath,
            JSON.stringify({
                dbPath: this.dbPath,
            }, undefined, 4));
    }

    fromJson(settings: object): void {
        this.dbPath = settings['dbPath'];
    }

    getPaths(): void {
        const appPath = remote.app.getAppPath();

        if (this.hasFixedDbLocation) {
            this.dbPath = path.join(remote.app.getPath(this.fixedLocation), 'data', this.dbName);
        } else {
            this.settingsPath = path.join(remote.app.getPath('userData'), 'settings.json');
        }

        console.log(this.dbPath, this.settingsPath);

        const isDevMode = /electron/.test(path.basename(remote.app.getPath('exe'), '.exe'));
        console.log(isDevMode);
        if (isDevMode) {
            this.dbFolder = path.join(appPath, this.dataSubFolder);
        } else {
            // remote.process.resoursesPath yields undefined
            this.dbFolder = path.join(remote.getGlobal('process').resourcesPath, this.dataSubFolder);
        }
    }
}
