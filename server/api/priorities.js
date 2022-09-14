import { createRouter, useBase } from 'h3';

const router = createRouter()

router.get('/', () => {
    return [
        {
          id: 0,
          title: "Nice to Have",
          color: "bg-teal-600 ring-teal-600",
          textColor: 'text-teal-600'
        },
        {
          id: 1,
          title: "Should Have",
          color: "bg-amber-600 ring-amber-600",
          textColor: 'text-amber-600'
        },
        {
          id: 2,
          title: "Must Have",
          color: "bg-red-600 ring-red-600",
          textColor: 'text-red-600'
        },
      ]
})

export default useBase('/api/priorities', router.handler);