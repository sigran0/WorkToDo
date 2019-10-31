
export default {
    API: {
        PUSH_QUEUE_ITEM: 'PUSH_QUEUE_ITEM',
        POP_QUEUE_ITEM: 'POP_QUEUE_ITEM'
    },
    Auth: {
        LOGOUT: 'LOGOUT',
        LOGIN: 'LOGIN',
        SET_USER: 'SET_USER'
    },
    Article: {
        EMPTY_ARTICLES: 'EMPTY_ARTICLES',
        READ_ARTICLES: 'READ_ARTICLES',
        WRITE_ARTICLE: 'WRITE_ARTICLE',
        MODIFY_ARTICLE: 'MODIFY_ARTICLE',
        DELETE_ARTICLE: 'DELETE_ARTICLE',
        CHANGED_ARTICLE: 'CHANGED_ARTICLE'
    },
    action: {
        todo: {
            fetch: 'ACTION_TODO_FETCH',
            write: 'ACTION_TODO_WRITE',
            read: 'ACTION_TODO_READ',
            modify: 'ACTION_TODO_MODIFY',
            delete: 'ACTION_TODO_DELETE'
        }
    },
    mutation: {
        todo: {
            writeAll: 'MUTATION_TODO_WRITE_ALL',
            write: 'MUTATION_TODO_WRITE',
            read: 'MUTATION_TODO_READ',
            modify: 'MUTATION_TODO_MODIFY',
            delete: 'MUTATION_TODO_DELETE',
            deleteAll: 'MUTATION_TODO_DELETE_ALL'
        }
    }
}
