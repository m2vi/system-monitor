import si from 'systeminformation';
import os from 'os';
import checkDiskSpace from 'check-disk-space';

import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { performance } from 'perf_hooks';
import { round } from './number';
import { readdirSync } from 'fs';

momentDurationFormatSetup(moment as any);

class System {
  async get() {
    const start = performance.now();

    const volumes = readdirSync('/Volumes');

    const data = {
      client: { ...os.userInfo(), uptime: moment.duration(os.uptime(), 'seconds').humanize() },
      battery: await si.battery(),
      disks: {
        volumes,
        main: await checkDiskSpace('/Volumes/Macintosh HD'),
        mounts: await si.diskLayout(),
      },
    };
    const end = performance.now();

    return {
      ...data,
      time: round(end - start),
    };
  }
}

export const system = new System();
export default system;
