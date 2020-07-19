import { installTasks } from './tasks/installTasks';

(async function () {
    try {
      const ctx = await installTasks.run()
      console.log(ctx);
    } catch (e) {
      console.error(e)
    }
  })()
