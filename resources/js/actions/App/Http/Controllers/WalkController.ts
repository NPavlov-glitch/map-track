import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\WalkController::index
 * @see app/Http/Controllers/WalkController.php:11
 * @route '/walks'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/walks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WalkController::index
 * @see app/Http/Controllers/WalkController.php:11
 * @route '/walks'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WalkController::index
 * @see app/Http/Controllers/WalkController.php:11
 * @route '/walks'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WalkController::index
 * @see app/Http/Controllers/WalkController.php:11
 * @route '/walks'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\WalkController::index
 * @see app/Http/Controllers/WalkController.php:11
 * @route '/walks'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\WalkController::index
 * @see app/Http/Controllers/WalkController.php:11
 * @route '/walks'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\WalkController::index
 * @see app/Http/Controllers/WalkController.php:11
 * @route '/walks'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\WalkController::create
 * @see app/Http/Controllers/WalkController.php:17
 * @route '/walks/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/walks/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WalkController::create
 * @see app/Http/Controllers/WalkController.php:17
 * @route '/walks/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WalkController::create
 * @see app/Http/Controllers/WalkController.php:17
 * @route '/walks/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WalkController::create
 * @see app/Http/Controllers/WalkController.php:17
 * @route '/walks/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\WalkController::create
 * @see app/Http/Controllers/WalkController.php:17
 * @route '/walks/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\WalkController::create
 * @see app/Http/Controllers/WalkController.php:17
 * @route '/walks/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\WalkController::create
 * @see app/Http/Controllers/WalkController.php:17
 * @route '/walks/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\WalkController::add
 * @see app/Http/Controllers/WalkController.php:22
 * @route '/walks'
 */
export const add = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: add.url(options),
    method: 'post',
})

add.definition = {
    methods: ["post"],
    url: '/walks',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\WalkController::add
 * @see app/Http/Controllers/WalkController.php:22
 * @route '/walks'
 */
add.url = (options?: RouteQueryOptions) => {
    return add.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WalkController::add
 * @see app/Http/Controllers/WalkController.php:22
 * @route '/walks'
 */
add.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: add.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\WalkController::add
 * @see app/Http/Controllers/WalkController.php:22
 * @route '/walks'
 */
    const addForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: add.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WalkController::add
 * @see app/Http/Controllers/WalkController.php:22
 * @route '/walks'
 */
        addForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: add.url(options),
            method: 'post',
        })
    
    add.form = addForm
const WalkController = { index, create, add }

export default WalkController