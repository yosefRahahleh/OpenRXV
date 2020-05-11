import { Module } from '@nestjs/common';

import { BullModule } from '@nestjs/bull';
import { TasksService } from './services/tasks.service';
import { HarvesterService } from './services/harveter.service';
import { FetchConsumer } from './consumers/fetch.consumer';
import { SharedModule } from 'src/shared/shared.module';
import { JsonFilesService } from 'src/admin/json-files/json-files.service';
import { HarvesterController } from './harvester/harvester.controller';
import { PluginsConsumer } from './consumers/plugins.consumer';
@Module({
    providers: [TasksService, HarvesterService, FetchConsumer, JsonFilesService,PluginsConsumer],
    exports: [HarvesterService, SharedModule, BullModule],
    imports: [
        SharedModule,
        BullModule.registerQueue({
            name: 'fetch',
            settings: {
                lockDuration: 10000,
                retryProcessDelay: 10000,
                maxStalledCount: 0,
                drainDelay: 10000
            },
            redis: {
                host: 'localhost',
                port: 6379,
            },
        }),
        BullModule.registerQueue({
            name: 'plugins',

            settings: {
                lockDuration: 10000,
                retryProcessDelay: 5000,
                drainDelay: 9000,
                maxStalledCount: 0,
            },
            redis: {
                host: 'localhost',
                port: 6379,
            },
        }),
    ],
    controllers: [HarvesterController]
})
export class HarvesterModule {

}
