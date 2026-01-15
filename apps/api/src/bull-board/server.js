import express from 'express'
import { ExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter.js'
import { createQueue } from '@repo/queue'
const app = express()
const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath('/admin/queues')
const youtubePublishQueue = createQueue('youtube-publish')
createBullBoard({
  queues: [new BullMQAdapter(youtubePublishQueue)],
  serverAdapter,
})
app.use('/admin/queues', serverAdapter.getRouter())
export { app as bullBoardApp }
//# sourceMappingURL=server.js.map
