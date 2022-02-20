import si from 'systeminformation';
import os from 'os';
import checkDiskSpace from 'check-disk-space';

class System {
  async get() {
    return {
      battery: await si.battery(),
      disk: await checkDiskSpace(os.platform() === 'win32' ? 'c:' : '/'),
    };
  }
}

export const system = new System();
export default system;
