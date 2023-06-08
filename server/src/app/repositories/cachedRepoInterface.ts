import { RedisRepository} from "../../frameworks/database/redis/cache"

export const cacheRepositoryInterface=(repository:ReturnType<RedisRepository>)=>{

    const setCache = async(cachingOptions:{
        key: string;
        expireTimeSec: number;
        data: string;
      })=>await repository.setCache(cachingOptions)

    return {
        setCache
    }

}

export type CacheRepositoryInterface = typeof cacheRepositoryInterface