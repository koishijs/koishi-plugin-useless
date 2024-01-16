import { Context, z } from 'koishi'
import {} from '@koishijs/plugin-notifier'

export const name = 'useless'
export const inject = ['notifier']
export const filter = false
export const reusable = true

export const usage = `
## 没用的插件

启用它会发生什么呢？
`

export interface Config {}

export const Config: z<Config> = z.object({})

export async function apply(ctx: Context, config: Config) {
  const notifier = ctx.notifier.create()

  for (let i = 5; i > 0; i--) {
    notifier.update(`插件将在 ${i} 秒后关闭……`)
    try {
      await ctx.sleep(1000)
    } catch {
      return
    }
  }

  ctx.scope.dispose()
}
