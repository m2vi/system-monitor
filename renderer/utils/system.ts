import si from 'systeminformation';
import os from 'os';
import osu from 'node-os-utils';

import psList from 'ps-list';

import checkDiskSpace from 'check-disk-space';

import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { performance } from 'perf_hooks';
import { round } from './number';
import { readdirSync } from 'fs';
import { basicFetch } from '@m2vi/iva';

momentDurationFormatSetup(moment as any);

class System {
  async get() {
    const start = performance.now();

    const data = {
      client: { ...os.userInfo(), uptime: moment.duration(os.uptime(), 'seconds').format('m [minutes]') },
      battery: await si.battery(),
      disk: await checkDiskSpace(`/`),
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
