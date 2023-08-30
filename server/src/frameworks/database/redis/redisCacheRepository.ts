import { CourseInterface } from '@src/types/courseInterface';
import { RedisClient } from '../../../app';

export function redisCacheRepository(redisClient: RedisClient) {

  const setCache = async ({
    key,
    expireTimeSec,
    data
  }: {
    key: string;
    expireTimeSec: number;
    data: string;
  }) => await redisClient.setEx(key, expireTimeSec, data);

  const clearCache = async (key: string) => {
    const result = await redisClient.del(key);
    return result === 1;
  };

  const populateTrie = async (course: CourseInterface) => {
    const trie: { [key: string]: any } = {}; // Initialize the trie object

    const title = course.title.toLowerCase();
    let currentNode: { [key: string]: any } = trie;

    for (const char of title) {
      if (!currentNode[char]) {
        currentNode[char] = {}; // Create a child node for the character
      }
      currentNode = currentNode[char]; // Move to the next node
    }

    currentNode['*'] = course.title; // Mark the end of the course title with '*'
    redisClient.set('course-trie', JSON.stringify(trie)); // Store the trie in Redis
  };

  return {
    setCache,
    clearCache,
    populateTrie
  };
}

export type RedisRepositoryImpl = typeof redisCacheRepository;
