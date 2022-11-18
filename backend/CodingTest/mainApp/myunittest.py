from unittest.mock import patch
import unittest
import temp.testcode

class MyUnitTest(unittest.TestCase):

    def test(self):
        file = open('./temp/input.txt', 'r')
        user_input = file.read().split()
        file.close()

        file = open('./temp/output.txt', 'r')
        right_ans = file.read().split()
        if len(right_ans) == 1:
            right_ans = int(right_ans[0])
        else:
            right_ans = tuple(map(int, right_ans))
        file.close()

        with patch('builtins.input', side_effect = user_input):
            ans = temp.testcode.solution()

        self.assertEqual(ans, right_ans)

if __name__ == '__main__':
    unittest.main()