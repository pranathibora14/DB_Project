import org.apache.spark.{SparkConf, SparkContext}
import org.apache.spark.sql.SQLContext

class UnitTest {
  @org.junit.Test
def Test1() : Unit={

  val conf = new SparkConf().setAppName("Joins").setMaster("local[*]")
  val sc = new SparkContext(conf)
  val sqlcontext = new SQLContext(sc)

  val studentdf = sqlcontext.read.option("header", true).csv("hdfs://localhost:9000/student_data.csv")
  val schooldf = sqlcontext.read.option("header", true).csv("hdfs://localhost:9000/school_data.csv")

   val count= studentdf.filter("school_id==700").filter("stud_id>2000").count()
  assert(23==count)

}

}

