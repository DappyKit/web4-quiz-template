/**
 * Shuffles an array and tracks the new position of the first element
 * @param array The array to shuffle
 * @returns A tuple containing the shuffled array and the new index of what was the first element
 */
export function shuffleOptions<T>(array: T[]): [T[], number] {
  // Create a copy of the array to avoid modifying the original
  const newArray = [...array];
  const correctAnswer = newArray[0]; // First option is correct
  let correctIndex = 0;
  
  // Fisher-Yates shuffle algorithm
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    
    // Track the position of the correct answer
    if (newArray[i] === correctAnswer) {
      correctIndex = i;
    } else if (newArray[j] === correctAnswer) {
      correctIndex = j;
    }
  }
  
  return [newArray, correctIndex];
} 