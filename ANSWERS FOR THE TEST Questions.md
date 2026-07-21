# Answers

DATABASE (SQL)
# 1. Customers who never purchased

SELECT customer_id, name, email
FROM customers
WHERE customer_id NOT IN (
  SELECT customer_id FROM sales
);
# 2. Duplicate lead emails
Format: one row per email, comma-separated lead_ids.

# PostgreSQL:

SELECT email, STRING_AGG(lead_id::text, ',') AS lead_ids
FROM leads
WHERE email IS NOT NULL
GROUP BY email
HAVING COUNT(*) > 1;

# 3. Product stock + total sold
SELECT
  p.name,
  p.stock_quantity,
  COALESCE(SUM(s.quantity), 0) AS total_sold
FROM products p





# DATA STRUCTURES
# 1. Longest substring without repeating characters
function lengthOfLongestSubstring(s) {
  let set = new Set();
  let left = 0;
  let maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}



# 3. Queue — enqueue / dequeue / print
class QueueNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
  }
  enqueue(value) {
    const node = new QueueNode(value);
    if (this.rear === null) {
      this.front = this.rear = node;
      return;
    }
    this.rear.next = node;
    this.rear = node;
  }
  dequeue() {
    if (this.front === null) return null;
    const value = this.front.value;
    this.front = this.front.next;
    if (this.front === null) this.rear = null;
    return value;
  }
 //print is what i cound't implement 
}
