import { RedisClient } from "../../../app";

export function redisRepository(redisClient: RedisClient) {
  const setCache = async({
    key,
    expireTimeSec,
    data,
  }: {
    key: string;
    expireTimeSec: number;
    data: string;
  }) =>await redisClient.setEx(key, expireTimeSec, data);
  return {
    setCache,
  };
}

export type RedisRepository = typeof redisRepository;

