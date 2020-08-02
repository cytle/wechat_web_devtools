import { installTasks } from './tasks/installTasks';
import { replaceWeappVendorTasks } from './tasks/replaceWeappVendorTasks';

(async function () {
    try {
      const ctx = await installTasks.run();
      await replaceWeappVendorTasks.run();
      console.log(ctx);
    } catch (e) {
      console.error(e)
    }
  })()
