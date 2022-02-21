import si from 'systeminformation';
import os from 'os';
import osu from 'node-os-utils';

import checkDiskSpace from 'check-disk-space';

import { performance } from 'perf_hooks';

class System {
  async get() {
    const start = performance.now();

    const data = {
      client: { ...os.userInfo(), uptime: os.uptime() },
      battery: await si.battery(),
      disk: await checkDiskSpace(`/`),
    };

    const end = performance.now();

    return {
      ...data,
      time: Math.round((end - start + Number.EPSILON) * 100) / 100,
    };
  }
}

export const system = new System();
export default system;
