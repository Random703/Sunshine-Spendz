import incomeAddedMeme from '@/assets/memes/income-added.png';
import foodExpenseMeme from '@/assets/memes/food-expense.png';
import matchaExpenseMeme from '@/assets/memes/matcha-expense.png';
import budgetExceededMeme from '@/assets/memes/budget-exceeded.png';
import expenseAddedMeme from '@/assets/memes/expense-added.png';
import coffeeExpenseMeme from '@/assets/memes/coffee-expense.png';
import carExpenseMeme from '@/assets/memes/car-expense.png';
import groceriesExpenseMeme from '@/assets/memes/groceries-expense.png';
import funExpenseMeme from '@/assets/memes/fun-expense.png';
import savingsMilestoneMeme from '@/assets/memes/savings-milestone.png';
import pizzaExpenseMeme from '@/assets/memes/pizza-expense.png';

export interface MemeEvent {
  type: string;
  message: string;
  image: string;
}

const MEME_MAP: Record<string, Array<{ message: string; image: string }>> = {
  'income.added': [
    { message: "stackin' sunshine! ☀️", image: incomeAddedMeme },
    { message: "cha-ching energy unlocked! 💰", image: savingsMilestoneMeme },
    { message: "money printer go brrrr! 🤑", image: incomeAddedMeme },
    { message: "wallet feelin' thicc today! 💸", image: savingsMilestoneMeme },
  ],
  'expense.added': [
    { message: "money went on a lil' adventure 🌈", image: expenseAddedMeme },
    { message: "bye bye, benjamins! 👋", image: expenseAddedMeme },
    { message: "treat yo'self moment! ✨", image: expenseAddedMeme },
    { message: "worth every penny tho! 💫", image: expenseAddedMeme },
  ],
  'expense.added.food': [
    { message: "chef's kiss approved 🍟", image: foodExpenseMeme },
    { message: "tasty tax paid! 😋", image: foodExpenseMeme },
    { message: "nom nom funds deployed! 🍽️", image: foodExpenseMeme },
    { message: "feeding the vibes! 🌟", image: pizzaExpenseMeme },
  ],
  'expense.added.pizza': [
    { message: "pizza party mode activated! 🍕", image: pizzaExpenseMeme },
    { message: "slice of happiness secured! 💖", image: pizzaExpenseMeme },
  ],
  'expense.added.coffee': [
    { message: "sippin' in style! ☕", image: coffeeExpenseMeme },
    { message: "liquid motivation acquired! 💪", image: coffeeExpenseMeme },
  ],
  'expense.added.loaded_fries': [
    { message: 'crispy priorities secured! 🍟', image: foodExpenseMeme },
    { message: 'loaded and lovin\' it! 😍', image: foodExpenseMeme },
  ],
  'expense.added.matcha': [
    { message: 'matcha made in heaven 🍵', image: matchaExpenseMeme },
    { message: 'green queen energy! 💚', image: matchaExpenseMeme },
  ],
  'expense.added.drinks': [
    { message: "stayin' hydrated & happy! 🥤", image: matchaExpenseMeme },
    { message: "thirst trap avoided! 💧", image: coffeeExpenseMeme },
    { message: "sip happens! ✨", image: matchaExpenseMeme },
  ],
  'expense.added.car': [
    { message: "vroom vroom budget goes zoom! 🚗", image: carExpenseMeme },
    { message: "keepin' the wheels spinnin'! 🎡", image: carExpenseMeme },
    { message: "car care = self care! 💙", image: carExpenseMeme },
  ],
  'expense.added.fuel': [
    { message: "gas tank happy, wallet sad! ⛽", image: carExpenseMeme },
    { message: "fuelin' the adventure! 🏁", image: carExpenseMeme },
  ],
  'expense.added.groceries': [
    { message: "cart goals achieved! 🛒", image: groceriesExpenseMeme },
    { message: "adulting level: grocery pro! 🌽", image: groceriesExpenseMeme },
    { message: "fridge restocked, vibes unlocked! 🥗", image: groceriesExpenseMeme },
  ],
  'expense.added.bills': [
    { message: "responsible adult unlocked! 📝", image: expenseAddedMeme },
    { message: "bills paid, stress slayed! ✅", image: expenseAddedMeme },
  ],
  'expense.added.fun': [
    { message: "livin' the best life! 🎉", image: funExpenseMeme },
    { message: "fun fund activated! 🎊", image: funExpenseMeme },
    { message: "memories > money! 🌈", image: funExpenseMeme },
  ],
  'budget.exceeded': [
    { message: 'uh-oh, retro red zone! 🚨', image: budgetExceededMeme },
    { message: 'budget said "not today"! ⚠️', image: budgetExceededMeme },
    { message: 'whoopsie daisy! 😅', image: budgetExceededMeme },
  ],
  'transaction.deleted': [
    { message: "undo like it never fry-pened! ↩️", image: expenseAddedMeme },
    { message: "poof! gone like magic! ✨", image: expenseAddedMeme },
    { message: "ctrl+z vibes! 🔄", image: expenseAddedMeme },
  ],
};

const getRandomMeme = (memes: Array<{ message: string; image: string }>) => {
  return memes[Math.floor(Math.random() * memes.length)];
};

export const getMeme = (eventType: string): MemeEvent | null => {
  const memes = MEME_MAP[eventType];
  if (memes) {
    const selectedMeme = getRandomMeme(memes);
    return {
      type: eventType,
      message: selectedMeme.message,
      image: selectedMeme.image,
    };
  }
  return null;
};

export const getMemeForTransaction = (
  type: 'income' | 'expense',
  category?: string,
  item?: string
): MemeEvent | null => {
  // Check for specific item memes first
  if (item) {
    const itemLower = item.toLowerCase();
    
    // Pizza
    if (itemLower.includes('pizza')) {
      return getMeme('expense.added.pizza');
    }
    // Coffee variations
    if (itemLower.includes('coffee') || itemLower.includes('latte') || itemLower.includes('cappuccino')) {
      return getMeme('expense.added.coffee');
    }
    // Loaded fries
    if (itemLower.includes('loaded') && itemLower.includes('fries')) {
      return getMeme('expense.added.loaded_fries');
    }
    // Matcha
    if (itemLower.includes('matcha')) {
      return getMeme('expense.added.matcha');
    }
  }

  // Check for category-specific memes
  if (category && type === 'expense') {
    const categoryKey = `expense.added.${category.toLowerCase()}`;
    const meme = getMeme(categoryKey);
    if (meme) return meme;
  }

  // Default meme for transaction type
  return getMeme(type === 'income' ? 'income.added' : 'expense.added');
};
