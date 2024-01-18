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

  let i = 6
  const notify = () => notifier.update(<>
    <p>插件将在 {i} 秒后关闭……</p>
    <p><button onClick={increment}>续一秒</button></p>
  </>)

  const increment = () => {
    i++
    notify()
  }

  while (--i > 0) {
    notify()
    try {
      await ctx.sleep(1000)
    } catch {
      return
    }
  }

  ctx.scope.dispose()
}
